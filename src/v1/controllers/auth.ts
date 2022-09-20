import jwt from "jsonwebtoken";
import express from "express";
import { body } from "express-validator";
import { generateNonce, SiweMessage } from 'siwe'
import User from "../../models/User";
import controllerLoader from "../middleware/controllerLoader";
import ironSession, { ironSessionOptions } from "../middleware/ironSession";

/**
 * Validation rules for this controller
 */
const rules = {
    body: {
        payload: {
            required: 
                body('siwe.payload', 'body.siwe.payload is required')
                    .exists()
                    .isLength({ min: 1 }),
        },
        signature: {
            required: 
                body('siwe.signature', 'body.siwe.signature is required')
                    .exists()
                    .isLength({ min: 1 }),
        },
    },
}

/**
 * Controller object - each key/route should return an array of middleware
 */
export default controllerLoader({

    nonce: [
        ironSession,
        (async (req, res, next) => {
            try {
                req.session.nonce = generateNonce();
                await req.session.save();
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify({
                    nonce: req.session.nonce,
                }, null, 2));
            } catch (err: any) {
                res.status(500).json({
                    message: `Error: ${err.message ?? "unknown error"}`,
                })
            }
        }) as express.RequestHandler
    ],

    login: [
        rules.body.payload.required,
        rules.body.signature.required,
        ironSession,
        (async (req, res, next) => {
            try {
                const { siwe: { signature, payload} } = req.body;
                const siweMessage = new SiweMessage(payload);
                const fields = await siweMessage.validate(signature);
                const { address, nonce } = fields;
                if (nonce !== req.session.nonce)
                  return res.status(422).json({ message: 'Invalid nonce.' });
                req.session.siwe = fields;
                req.session.jwt = jwt.sign({ 
                  siwe: fields,
                }, ironSessionOptions.password);
                await req.session.save();
                let user = await User.findOne({ address });
                if(!user) user = await User.create({ address });
                res.json({ success: true });
            } catch (err: any) {
                console.log(err)
                res.status(500).json({
                    message: `Error: ${err.message ?? "unknown error"}`,
                })
            }
        }) as express.RequestHandler
    ],

    logout: [
        ironSession,
        (async (req, res, next) => {
            try {
                req.session.destroy();
                res.status(200).send({ success: true });
            } catch (err: any) {
                res.status(500).json({
                    message: `Error: ${err.message ?? "unknown error"}`,
                })
            }
        }) as express.RequestHandler
    ],

    profile: [
        ironSession,
        (async (req, res, next) => {
            try {
                const address = req.session.siwe?.address;
                const jwt = req.session?.jwt;
                if(!address) return res.json({ user: null });
                const user = await User.findOne({ address });
                res.json({ user, jwt });
            } catch (err: any) {
                res.status(500).json({
                    message: `Error: ${err.message ?? "unknown error"}`,
                })
            }
        }) as express.RequestHandler
    ],

});