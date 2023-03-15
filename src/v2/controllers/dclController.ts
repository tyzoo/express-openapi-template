import express from "express";
import * as dcl from 'decentraland-crypto-middleware'
import { Get, Route, Request, Middlewares, Tags, Response, Example } from "tsoa";
import decentralandMiddleware from "../middleware/decentraland";

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
  @Middlewares(decentralandMiddleware.Optional)
  @Example({
    address: `0x12345...`,
    metadata: {},
  }, "Successful Response")
  public async optional(
    @Request() _req: express.Request,
  ): Promise<{
    address: string;
    metadata: Record<string, any> | undefined;
  }> {
    const req: Request & dcl.DecentralandSignatureData = (_req as any);
    const address: string | undefined = req.auth
    const metadata: Record<string, any> | undefined = req.authMetadata
    return { address, metadata }
  }

  /**
   * Required DCL Route
   * @summary Required DCL Route
   */
  @Get("required")
  @Middlewares(decentralandMiddleware.Required)
  @Example({
    address: `0x12345...`,
    metadata: {},
  }, "Successful Response")
  public async required(
    @Request() _req: express.Request,
    ): Promise<{
      address: string;
      metadata: Record<string, any> | undefined;
    }> {
    const req: Request & dcl.DecentralandSignatureData = (_req as any);
    const address: string = req.auth;
    const metadata: Record<string, any> = req.authMetadata;
    return { address, metadata }
  }
}