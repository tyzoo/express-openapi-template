import express from "express";
import { ValidationChain, validationResult } from "express-validator";

export type ControllerType = { [name: string]: (ValidationChain | express.RequestHandler)[] }

const validationChecker = (async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: `Validation error: ${errors.array().map(x => x.msg).join(", ")}`,
        });
    }
    next();
}) as express.RequestHandler

/**
 * The controller loader function loops through all routes and inserts a validation checker middleware where appropriate
 * @param controller 
 * @returns array of middleware
 */
export default function controllerLoader(
    controller: ControllerType
): ControllerType {
    /**
     * Insert the validator checker middleware before our express.RequestHandler on each route
     */
    Object.keys(controller).forEach(key => {
        const arr = controller[key];
        const lastIdx = arr.length - 1;
        if (lastIdx > 0) arr.splice(lastIdx, 0, validationChecker);
    });

    return controller;
}