import express from "express";
import * as dcl from 'decentraland-crypto-middleware';
import combineMiddleware from "../combineMiddleware";
import { Metadata, VALID_SIGNATURE_TOLERANCE_INTERVAL_MS } from "./security/utils";
import { runChecks } from "./security/securityChecks";

export const decentralandOptional = combineMiddleware([
    dcl.express({ optional: true }),
    (_req, res, next) => {
        const req: express.Request & dcl.DecentralandSignatureData = (_req as any);
        res.locals.address = req.auth as string | undefined;
        res.locals.metadata = req.authMetadata as Record<string, any> | undefined;
        next()
    }
]);

export const decentralandRequired = (parcel: [x: number, y: number]) => combineMiddleware([
    dcl.express({ 
        optional: false,
        expiration: VALID_SIGNATURE_TOLERANCE_INTERVAL_MS, 
    }),
    async (_req, res, next) => {
        const req: express.Request & dcl.DecentralandSignatureData<Metadata> = (_req as any);
        res.locals.address = req.auth as string;
        res.locals.metadata = req.authMetadata as Record<string, any>;
        try {
            await runChecks(req, parcel);
        }catch(err:any){
            const { message } = err
            return res.status(403).json({
                message,
            })
        }
        next()
    }
])