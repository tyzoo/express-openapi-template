import express from "express";
import combineMiddleware from "../utils/combineMiddleware";
import redis from "../utils/redis";

export default function createRateLimiter({
    prefix,
    requestLimit,
    secondsPerWindow,
}:{
    prefix: string,
    requestLimit: number,
    secondsPerWindow: number,
}){
    return combineMiddleware([
        (async (req, res, next) => {
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            const redisKey = (ip: string) => `${prefix}|${ip}`
            const key = redisKey(ip as string);
            const requests = await redis.incr(key);
            let ttl: number;
            if(requests === 1){
                await redis.expire(key, secondsPerWindow);
                ttl = secondsPerWindow;
            }else{
                ttl = await redis.ttl(key);
            }
            if(requests > requestLimit){
                return res.status(503).json({
                    ok: false,
                    message: `You are being rate limited! Slow down.`,
                    requests,
                    ttl,
                })
            }
            res.locals.rateLimit = { requests, ttl }
            next()
    
        }) as express.RequestHandler,
    ])
}