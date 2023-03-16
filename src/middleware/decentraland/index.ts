import express from "express";
import * as dcl from "decentraland-crypto-middleware";
import combineMiddleware from "../combineMiddleware";
import {
	Metadata,
	VALID_SIGNATURE_TOLERANCE_INTERVAL_MS,
} from "./security/dclConfig";
import { runChecks } from "./security/securityChecks";

export * as securityChecks from "./security/securityChecks";
export * as dclConfig from "./security/dclConfig";
export { Metadata, PeerResponse } from "./security/dclConfig";
export * as verifyOnMap from "./security/verifyOnMap";

export const decentralandOptional = combineMiddleware([
	dcl.express({ optional: true }),
	(_req, res, next) => {
		const req: express.Request & dcl.DecentralandSignatureData = _req as any;
		res.locals.address = req.auth as string | undefined;
		res.locals.metadata = req.authMetadata as Metadata | undefined;
		next();
	},
]);

export const decentralandRequired = (parcel: [x: number, y: number]) =>
	combineMiddleware([
		dcl.express({
			optional: false,
			expiration: VALID_SIGNATURE_TOLERANCE_INTERVAL_MS,
		}),
		async (_req, res, next) => {
			const req: express.Request & dcl.DecentralandSignatureData<Metadata> =
				_req as any;
			res.locals.address = req.auth as string;
			res.locals.metadata = req.authMetadata as Metadata;
			try {
				await runChecks(req, parcel);
				return;
			} catch (err: any) {
				const { message } = err;
				return res.status(403).json({
					message,
				});
			}
			next();
		},
	]);
