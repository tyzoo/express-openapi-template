import express from "express";
import * as dcl from 'decentraland-crypto-middleware'
import { Get, Route, Request, Middlewares, Tags, Response, Example } from "tsoa";
import { decentralandOptional, decentralandRequired, Metadata } from "../middleware";

interface MetadataResponse {
  address: string;
  metadata?: Metadata;
}

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
   * @returns {MetadataResponse}
   */
  @Get("optional")
  @Middlewares(decentralandOptional)
  @Example<MetadataResponse>({
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
  ): Promise<MetadataResponse> {
    const req: Request & dcl.DecentralandSignatureData = (_req as any);
    const address: string | undefined = req.auth
    const metadata: Metadata | undefined = req.authMetadata as Metadata;
    return { address, metadata }
  }

  /**
   * Required DCL Route
   * @summary Required DCL Route
   * @returns {MetadataResponse}
   */
  @Get("required")
  @Middlewares(decentralandRequired)
  @Example<MetadataResponse>({
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
  ): Promise<MetadataResponse> {
    const req: Request & dcl.DecentralandSignatureData = (_req as any);
    const address: string = req.auth;
    const metadata = req.authMetadata as Metadata;
    return { address, metadata }
  }
}