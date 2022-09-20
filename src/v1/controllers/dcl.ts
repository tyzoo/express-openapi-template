import express from "express";
import * as dcl from 'decentraland-crypto-middleware'
import controllerLoader from "../middleware/controllerLoader";
import decentralandMiddleware from "../middleware/decentraland";

export default controllerLoader({

    optional: [
        decentralandMiddleware.Optional,
        (async (_req, res, next) => {
            const req: Request & dcl.DecentralandSignatureData = (_req as any);
            const address: string | undefined = req.auth
            const metadata: Record<string, any> | undefined = req.authMetadata
            try {
                res.status(200).json({ address, metadata });
            } catch (err: any) {
                res.status(500).json({
                    message: `Error: ${err.message ?? "unknown error"}`,
                })
            }
        }) as express.RequestHandler
    ],

    required: [
        decentralandMiddleware.Required,
        (async (_req, res, next) => {
            const req: Request & dcl.DecentralandSignatureData = (_req as any);
            const address: string = req.auth;
            const metadata: Record<string, any> = req.authMetadata;
            try {
                res.status(200).json({ address, metadata });
            } catch (err: any) {
                res.status(500).json({
                    message: `Error: ${err.message ?? "unknown error"}`,
                })
            }
        }) as express.RequestHandler
    ],

});