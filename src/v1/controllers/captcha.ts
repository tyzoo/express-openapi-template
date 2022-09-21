import express from "express";
import controllerLoader from "../middleware/controllerLoader";
import svgCaptcha from "svg-captcha";
import ironSession from "../middleware/ironSession";
import { body } from "express-validator";

/**
 * Validation rules for this controller
 */
 const rules = {
    body: {
        code: {
            required: 
                body('code', 'code is required')
                    .exists()
                    .isLength({ min: 4 }),
        },
    },
}
/**
 * Controller object returns array of middleware by key
 */
export default controllerLoader({

    new: [
        ironSession,
        (async (req, res, next) => {
            try {
                const captcha = svgCaptcha.create({
                    size: 6,
                    noise: 3,
                });
                req.session.captcha = captcha.text;
                await req.session.save();
                res.type('svg');
                res.status(200).send(captcha.data);
            } catch (err: any) {
                res.status(500).json({
                    message: `Error: ${err.message ?? "unknown error"}`,
                })
            }
        }) as express.RequestHandler,
    ],

    verify: [
        ironSession,
        rules.body.code.required,
        (async (req, res, next) => {
            try {
                const { code } = req.body;
                const sessionCode = req.session.captcha
                if( code && sessionCode && code === sessionCode ) {
                    res.status(200).json({ success: true });
                } else {
                    res.status(403).json({ message: `Invalid code` });
                }
            } catch (err: any) {
                res.status(500).json({
                    message: `Error: ${err.message ?? "unknown error"}`,
                })
            }
        }) as express.RequestHandler,
    ],
    
});