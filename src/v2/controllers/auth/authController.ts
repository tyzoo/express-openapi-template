import jwt from "jsonwebtoken";
import express from "express";
import { ethers } from "ethers";
import { generateNonce, SiweMessage } from "siwe";
import { Get, Route, Request, Middlewares, Tags, Body, Post, Response, Example } from "tsoa";
import { User, UserModel } from "../../../models/User";
import ironSession, { ironSessionOptions } from "../../middleware/ironSession";
import { APIError } from "../../utils";

@Route("auth")
@Tags("Authentication")
@Response<{ message: string; }>(401, "Unauthorized", { message: `Unauthorized request` })

export class AuthController {

  /**
   * Get a nonce for a user
   */
  @Post("nonce")
  @Middlewares(ironSession)
  public async nonce(
    @Body() body: { address: string; },
    @Request() req: express.Request,
  ): Promise<{ nonce: string; }> {
    let { address } = body;
    try {
      address = ethers.utils.getAddress(address)
    } catch {
      throw new APIError(401, `Invalid ethereum address`);
    }
    const nonce = generateNonce();
    req.session.nonce = nonce;
    await req.session.save();
    let user = await UserModel.findOne({ address });
    if (!user) {
      user = await UserModel.create({ address, nonce });
    } else {
      user.nonce = nonce;
      await user.save();
    }
    return { nonce }
  }

  /**
   * Get a SIWE Payload for an address/nonce
   */
  @Post("siwe-payload")
  @Middlewares(ironSession)
  public async getSiweMessage(
    @Body() body: {
      address: string;
      nonce: string;
    },
    @Request() req: express.Request,
  ): Promise<{ message: string; }> {
    let { address, nonce } = body;
    const domain = req.hostname;
    const origin = req.headers.origin;
    try {
      address = ethers.utils.getAddress(address)
    } catch { throw new APIError(401, `Invalid ethereum address`); }
    let checkNonce = req.session.nonce;
    if (!checkNonce) {
      const user = await UserModel.findOne({ address });
      if (!user) throw new APIError(401, `Invalid user`);
      if (!user.nonce) throw new APIError(401, `Missing nonce on user`);
      checkNonce = user.nonce;
    }
    if (!nonce || !checkNonce || nonce !== checkNonce) {
      throw new APIError(401, `Invalid nonce`);
    }
    const siweMessage = new SiweMessage({
      domain,
      address,
      statement: `Sign in with Ethereum to the app.`,
      uri: origin,
      version: '1',
      nonce,
      chainId: 1,
    });
    return { message: siweMessage.prepareMessage() }
  }

  /**
   * Login with SIWE
   */
  @Post("login")
  @Middlewares(ironSession)
  public async login(
    @Body() body: {
      siwe: {
        address: string;
        signature: string;
        payload: string;
      },
    },
    @Request() req: express.Request,
  ): Promise<{ success: boolean; }> {
    const { siwe: { signature, payload} } = body;
    const siweMessage = new SiweMessage(payload);
    const fields = await siweMessage.validate(signature);
    const { address, nonce } = fields;
    if (nonce !== req.session.nonce) throw new APIError(401, `Invalid nonce`);
    req.session.siwe = fields;
    req.session.jwt = jwt.sign({ 
      siwe: fields,
    }, ironSessionOptions.password);
    await req.session.save();
    let user = await UserModel.findOne({ address });
    if(!user) user = await UserModel.create({ address });
    return { success: true }
  }

  /**
   * Logout from SIWE
   */
  @Get("logout")
  @Middlewares(ironSession)
  public async logout(
    @Request() req: express.Request,
  ): Promise<{ success: boolean; }> {
    if(req.session?.jwt){
      req.session.destroy();
      return { success: true };
    }else{
      return { success: false };
    }
  }

  /**
   * Get SIWE Profile
   */
  @Get("profile")
  @Middlewares(ironSession)
  @Example({
    "user": {
      "_id": "632a1ed547dcfbc73c912345",
      "address": "0x3C815A79f52A07AD30a8Ad299F68D0C328E12345",
      "admin": false,
      "nonce": "ItiFRj6T1rQaqwerty",
      "updatedAt": "2023-03-15T01:29:47.938Z"
    },
    "jwt": "eyfrgGciJ..."
  }, "Successful Response")
  public async profile(
    @Request() req: express.Request,
  ): Promise<{
    user: User | null;
    jwt?: string;
  }> {
    const address = req.session.siwe?.address;
    const jwt = req.session?.jwt;
    if(!address) throw new APIError(401, "Session not found");
    const user = await UserModel.findOne({ address });
    if(!user) throw new APIError(401, "User not found");
    return { user, jwt };
  }
}