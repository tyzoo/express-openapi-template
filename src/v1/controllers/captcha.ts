import express from "express";
import controllerLoader from "../middleware/controllerLoader";
import svgCaptcha from "svg-captcha";
import ironSession from "../middleware/ironSession";
import { body } from "express-validator";
import { svg2png } from "svg-png-converter";
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
                    noise: 6,
                    width: 300,
                    height: 100,
                    ignoreChars: '0o1iIlO',
                });
                const png = await svg2png({ 
                    input: captcha.data.trim(), 
                    encoding: 'dataURL', 
                    format: 'png',
                })
                req.session.captcha = captcha.text;
                await req.session.save();
                const img = Buffer.from(
                    png.replace(/^data:image\/png;base64,/, ''), 
                    'base64'
                );
                res.writeHead(200, {
                  'Content-Type': 'image/png',
                  'Content-Length': img.length
                });
                res.end(img); 
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