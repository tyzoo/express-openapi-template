// import { Middleware, ExpressMiddlewareProvider } from 'tsoa';
// import { Request, Response, NextFunction } from 'express';

// @Middleware
// export class CustomMiddleware implements ExpressMiddlewareProvider {
//   public async middleware(req: Request, res: Response, next: NextFunction): Promise<void> {
//     // Add your custom middleware logic here
//     console.log('Custom middleware executed');

//     // You can also add properties to the request object, which will be accessible in the controller
//     (req as any).customProperty = 'Custom middleware value';

//     next();
//   }
// }
