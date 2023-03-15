import express from "express";
import * as dcl from 'decentraland-crypto-middleware'
import { Get, Route, Request, Middlewares, Tags, Response, Example } from "tsoa";
import { Metadata } from "../middleware/decentraland/security/utils";
import { decentralandOptional, decentralandRequired } from "../middleware/decentraland";

@Route("dcl")
@Tags("Decentraland")
@Response<{
  ok: boolean;
  message: string;
}>(400, "Bad Request", {
  ok: false,
  message: "Invalid Auth Chain"
})

export class DCLController {

  /**
   * Optional DCL route
   * @summary Optional DCL Route
   */
  @Get("optional")
  @Middlewares(decentralandOptional)
  @Example<{ address: string, metadata: Metadata }>({
    address: `0x12345...`,
    metadata: {
      origin: "http://127.0.0.1:8000",
      sceneId: "b64-L1Vz...",
      parcel: "0,0",
      tld: "org",
      network: "mainnet",
      isGuest: true,
      realm: {
        domain: "http://127.0.0.1:8000",
        layer: "",
        catalystName: "http://127.0.0.1:8000"
      },
      signer: "decentraland-kernel-scene"
    },
  }, "Successful Response")
  public async optional(
    @Request() _req: express.Request,
  ): Promise<{
    address: string;
    metadata: Record<string, any> | undefined;
  }> {
    const req: Request & dcl.DecentralandSignatureData = (_req as any);
    const address: string | undefined = req.auth
    const metadata: Metadata | undefined = req.authMetadata as Metadata;
    return { address, metadata }
  }

  /**
   * Required DCL Route
   * @summary Required DCL Route
   */
  @Get("required")
  @Middlewares(decentralandRequired)
  @Example<{ address: string, metadata: Metadata }>({
    address: `0x12345...`,
    metadata: {
      origin: "http://127.0.0.1:8000",
      sceneId: "b64-L1Vz...",
      parcel: "0,0",
      tld: "org",
      network: "mainnet",
      isGuest: true,
      realm: {
        domain: "http://127.0.0.1:8000",
        layer: "",
        catalystName: "http://127.0.0.1:8000"
      },
      signer: "decentraland-kernel-scene"
    },
  }, "Successful Response")
  public async required(
    @Request() _req: express.Request,
  ): Promise<{
    address: string;
    metadata: Metadata;
  }> {
    const req: Request & dcl.DecentralandSignatureData = (_req as any);
    const address: string = req.auth;
    const metadata = req.authMetadata as Metadata;
    return { address, metadata }
  }
}