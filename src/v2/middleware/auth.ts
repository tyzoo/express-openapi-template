import express from "express";
import jwt from "jsonwebtoken";
import { ironSessionOptions } from "./ironSession";


const authMiddleware = {

    jwtHeaderOrSession: (async (req, res, next) => {
        try {
            let jwtPayload: any;
            const { authorization } = req.headers;
            if(authorization) {
                try {
                    jwtPayload = jwt.verify(
                        authorization.replace("Bearer ", ""),
                        ironSessionOptions.password
                    )
                }catch{
                    return res.status(403).json({ 
                        message: `Unable to verify authorization token provided`
                    })
                }
            }else{
                if(req.session && req.session?.jwt){
                    try {
                        jwtPayload = jwt.verify(
                            req.session.jwt.replace("Bearer ", ""),
                            ironSessionOptions.password
                        )
                    }catch{
                        return res.status(403).json({ 
                            message: `Unable to verify authorization token provided`
                        })
                    }
                }else{
                    return res.status(403).json({ 
                        message: `Not authenticated`
                    })
                }
            }
            next()
        } catch (err: any) {
            res.status(500).json({
                message: `Error: ${err.message ?? "unknown error"}`,
            })
        }
    }) as express.RequestHandler,

    jwtHeader: (async (req, res, next) => {
        try {
            let jwtPayload: any;
            const { authorization } = req.headers;
            if(authorization) {
                try {
                    jwtPayload = jwt.verify(
                        authorization.replace("Bearer ", ""),
                        ironSessionOptions.password
                    )
                }catch{
                    return res.status(403).json({ 
                        message: `Unable to verify authorization token provided`
                    })
                }
            }else{
                return res.status(403).json({ 
                    message: `Not authenticated`
                })
            }
            next()
        } catch (err: any) {
            res.status(500).json({
                message: `Error: ${err.message ?? "unknown error"}`,
            })
        }
    }) as express.RequestHandler,

    session: (async (req, res, next) => {
        try {
            let jwtPayload: any;
            if(req.session && req.session?.jwt){
                try {
                    jwtPayload = jwt.verify(
                        req.session.jwt.replace("Bearer ", ""),
                        ironSessionOptions.password
                    )
                }catch{
                    return res.status(403).json({ 
                        message: `Unable to verify authorization token provided`
                    })
                }
            }else{
                return res.status(403).json({ 
                    message: `Not authenticated`
                })
            }
            next()
        } catch (err: any) {
            res.status(500).json({
                message: `Error: ${err.message ?? "unknown error"}`,
            })
        }
    }) as express.RequestHandler

}

export default authMiddleware;