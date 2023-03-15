import * as express from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName === "api_key") {
        let token;
        if (request.query && request.query.access_token) {
            token = request.query.access_token;
        }

        if (token === "abc123456") {
            return Promise.resolve({
                id: 1,
                name: "Ironman",
            });
        } else {
            return Promise.reject({});
        }
    }

    if (securityName === "jwt") {
        const token =
            request.body.token ||
            request.query.token ||
            request.headers.authorization?.replace("Bearer ","");

        return new Promise((resolve, reject) => {
            if (!token) {
                reject(new Error("No token provided"));
            }
            jwt.verify(token, process.env.SECRET_COOKIE_PASSWORD!, function (err: any, decoded: any) {
                if (err) {
                    reject(err);
                } else {
                    // Check if JWT contains all required scopes
                    if (scopes) {
                        for (let scope of scopes) {
                            if (!decoded.scopes.includes(scope)) {
                                reject(new Error("JWT does not contain required scope."));
                            }
                        }
                    }
                    resolve(decoded);
                }
            });
        });
    }
}