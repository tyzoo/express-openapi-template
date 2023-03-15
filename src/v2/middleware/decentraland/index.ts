import { Request } from 'express';
import * as dcl from 'decentraland-crypto-middleware';
import combineMiddleware from '../combineMiddleware';
import { runChecks } from './security/securityChecks';
import { Metadata, VALID_SIGNATURE_TOLERANCE_INTERVAL_MS } from './security/utils';

/**
 * Decentraland SignedFetch Middleware
 */

const decentralandMiddleware = {

    Optional: combineMiddleware([
        dcl.express({ optional: true }),
        (_req, res, next) => {
            const req: Request & dcl.DecentralandSignatureData = (_req as any);
            const address: string | undefined = req.auth;
            const metadata: Record<string, any> | undefined = req.authMetadata;

            // const metadata = {
            //     "address":"0x3c4e641e35e8e876961ef79c5471d71e77a00525",
            //     "metadata":{
            //         "origin":"http://127.0.0.1:8000",
            //         "sceneId":"b64-L1VzZXJzL3RydXNzL0Rlc2t0b3AvcHJvamVjdHMvZXkvZGNsLXNhdC1mZXN0",
            //         "parcel":"-9,-9",
            //         "tld":"org",
            //         "network":"mainnet",
            //         "isGuest":true,
            //         "realm":{
            //             "domain":"http://127.0.0.1:8000",
            //             "layer":"",
            //             "catalystName":"http://127.0.0.1:8000"
            //         },
            //         "signer":"decentraland-kernel-scene"
            //     }
            // }
            console.log(`DCL Optional Middleware`, { address, metadata})

            next()
        }
    ]),
    

    Required: combineMiddleware([
        dcl.express({ 
            optional: false,
            expiration: VALID_SIGNATURE_TOLERANCE_INTERVAL_MS, 
        }),
        async (_req, res, next) => {
            const req: Request & dcl.DecentralandSignatureData<Metadata> = (_req as any);
            const address: string = req.auth;
            const metadata: Record<string, any> = req.authMetadata;
            try {
                await runChecks(req, metadata.realm.domain);
            }catch(err:any){
                const { message } = err
                return res.status(403).json({
                    message,
                })
            }
            next()
        }
    ]),
}

export default decentralandMiddleware;
