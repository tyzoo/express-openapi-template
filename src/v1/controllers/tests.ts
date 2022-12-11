import express from "express";
import { ItemModel } from "../../models/Item";
import controllerLoader from "../middleware/controllerLoader";
import createRateLimiter from "../middleware/rateLimiter";

/**
 * Controller object returns array of middleware by key
 */
export default controllerLoader({

    rateLimit: [
        createRateLimiter({
            prefix: `rateLimitExample`, 
            requestLimit: 1, 
            secondsPerWindow: 10,
        }),
        (async (req, res, next) => {
            res.json({
                ok: true,
                message: `This request is allowed!`,
                ...res.locals.rateLimit,
            })
        }) as express.RequestHandler
    ],

    addItems: [
        (async (req, res, next) => {
            try {
                const count = await ItemModel.countDocuments({})
                for(let i = 1+count; i <= 10+count; i++){
                    await ItemModel.create({
                        name: `Item ${i}`,
                    })
                }
                res.status(200).json({ message: `Added 10 test items to database` })
            } catch (err: any) {
                res.status(500).json({
                    message: `Error: ${err.message ?? "unknown error"}`,
                })
            }
        }) as express.RequestHandler
    ],

    checkConnection: [
        (async (req, res, next) => {
            try {
                res.status(200).json({ online: true });
            } catch (err: any) {
                res.status(500).json({
                    message: `Error: ${err.message ?? "unknown error"}`,
                })
            }
        }) as express.RequestHandler
    ],
});