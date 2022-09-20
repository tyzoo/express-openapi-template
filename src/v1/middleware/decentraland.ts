import * as dcl from 'decentraland-crypto-middleware';
import combineMiddleware from '../utils/combineMiddleware';

const decentralandMiddleware = {

    Optional: combineMiddleware([
        dcl.express({ optional: true }),
        (_req, res, next) => {
            const req: Request & dcl.DecentralandSignatureData = (_req as any);
            const address: string | undefined = req.auth;
            const metadata: Record<string, any> | undefined = req.authMetadata;

            console.log(`DCL Optional Middleware`, { address, metadata})

            next()
        }
    ]),
    

    Required: combineMiddleware([
        dcl.express({ optional: false }),
        (_req, res, next) => {
            const req: Request & dcl.DecentralandSignatureData = (_req as any);
            const address: string = req.auth;
            const metadata: Record<string, any> = req.authMetadata;

            console.log(`DCL Required Middleware`, { address, metadata})
            
            next()
        }
    ]),
}

export default decentralandMiddleware;