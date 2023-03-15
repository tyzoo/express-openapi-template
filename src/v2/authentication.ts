import * as express from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../models/User";
import combineMiddleware from "./middleware/combineMiddleware";
import ironSession from "./middleware/ironSession";
dotenv.config();

export async function expressAuthentication(
    req: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {

    const getIronRequest = () => {
        return new Promise((resolve, reject) => {
            combineMiddleware([
                ironSession,
                ((req, res, next) => {
                    resolve(req)
                }) as express.RequestHandler,
            ])(req,req.res!,req.next!)
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
            if (!token) {
                reject(new Error("No token provided"));
            }
            jwt.verify(
                token,
                process.env.SECRET_COOKIE_PASSWORD!,
                async function (err: any, decoded: any) {
                    if (err) {
                        reject(err);
                    } else {
                        if (scopes) {
                            for (const scope of scopes) {
                                if (!decoded.user?.scopes?.includes(scope)) {
                                    reject(new Error(`JWT does not contain required scope "${scope}"`));
                                }
                            }
                        }
                        const user = await UserModel.findById(decoded.user._id).select("jwt");
                        if (!user) return reject(new Error(`User doesn't exist`));
                        if (user.jwt !== token) return reject(new Error(`JWT is invalid`));
                        resolve(decoded);
                    }
                }
            );
        });
    }

}