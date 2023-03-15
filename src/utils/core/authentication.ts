import * as express from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Scopes, UserModel } from "../../models/User";
import { combineMiddleware, ironSession } from "../../middleware";
dotenv.config();

export async function expressAuthentication(
  req: express.Request,
  securityName: string,
  scopes?: string[],
): Promise<any> {

  const getIronRequest = () => {
    return new Promise((resolve, reject) => {
      combineMiddleware([
        ironSession,
        ((req, res, next) => {
          resolve(req)
        }) as express.RequestHandler,
      ])(req, req.res!, req.next!)
    })
  }
  const ironReq = await getIronRequest() as unknown as express.Request;

  if (securityName === "api_key") {
    // let token;
    // if (req.query && req.query.access_token) {
    //     token = req.query.access_token;
    // }

    // if (token === "abc123456") {
    //     return Promise.resolve({
    //         id: 1,
    //         name: "Ironman",
    //     });
    // } else {
    return Promise.reject({});
    // }
  }

  if (securityName === "jwt") {
    const token =
      ironReq.body.token ||
      ironReq.query.token ||
      ironReq.headers.authorization?.replace("Bearer ", "") ||
      ironReq.session.jwt;
    return new Promise((resolve, reject) => {
      if (!token) return reject(new Error("No token provided"));
      jwt.verify(
        token,
        process.env.SECRET_COOKIE_PASSWORD!,
        async function (err: any, decoded: any) {
          if (err) {
            reject(err);
          } else {
            const user = await UserModel.findById(decoded.user._id).select([
              "jwt",
              "scopes",
            ]);
            if (!user) return reject(new Error(`User doesn't exist`));
            if (user.scopes?.includes(Scopes.BANNED) && !scopes?.includes(Scopes.BANNED)) {
              return reject(new Error(`Your account is banned`));
            }
            if (scopes) {
              for (const scope of scopes) {
                if (!user.scopes?.includes(scope as Scopes)) {
                  return reject(new Error(`User account is missing a required scope '${scope}'`));
                }
              }
            }
            if (user.jwt !== token) return reject(new Error(`JWT is invalid`));
            resolve(decoded);
          }
        }
      );
    });
  }
}