import * as express from "express";
import { Get, Route, Request, Middlewares, Security, Response } from "tsoa";

@Route("users")
export class UserController {
  @Get("{userId}")
  @Security('jwt', ['project:read'])
  @Response('403', 'Unathorized')
  @Middlewares(((req,res,next) => {
    console.log("YURR MIDLEWAREEE")
    res.locals.foo = "bar";
    next()
  }) as express.RequestHandler)
  public async getUser(
    userId: number,
    @Request() req: express.Request,
  ): Promise<{ name: string}> {
    const res = req.res;
    // TODO: implement some code that uses the request as well
    // Middlewares(request);
    
    return { name: `yooooo ${res?.locals.foo}` }
  } 
}