import express from "express";
import { body, param } from "express-validator";
import { ItemModel } from "../../models/Item";
import controllerLoader from "../utils/controllerLoader";

/**
 * Validation rules for this controller
 */
const rules = {
    body: {
        name: {
            required: body('name', 'body.name is required').exists().isLength({ min: 1 }),
        }
    },
    param: {
        itemId: {
            required: param('itemId', 'param.itemId is required').exists(),
            isMongoId: param('itemId', 'param.itemId is not a Mongo ID').isMongoId(),
        }
    }
}

/**
 * Controller object - each key/route should return an array of middleware
 */
export default controllerLoader({

    createItem: [
        rules.body.name.required,
        (async (req, res, next) => {
            try {
                const item = new ItemModel(req.body);
                await item.save();
                res.status(200).json(item);
            } catch (err: any) {
                res.status(500).json({
                    message: `Error: ${err.message ?? "unknown error"}`,
                })
            }
        }) as express.RequestHandler
    ],

    findItem: [
        rules.param.itemId.required,
        rules.param.itemId.isMongoId,
        (async (req, res, next) => {
            try {
                const item = await ItemModel.findById(req.params.itemId).select(["-__v"]);
                res.status(200).json(item);
            } catch (err: any) {
                res.status(500).json({
                    message: `Error: ${err.message ?? "unknown error"}`,
                })
            }
        }) as express.RequestHandler
    ],

    findAllItems: [
        (async (req, res, next) => {
            try {
                const items = await ItemModel.find({}).select(["-__v"]);
                res.status(200).json(items);
            } catch (err: any) {
                res.status(500).json({
                    message: `Error: ${err.message ?? "unknown error"}`,
                })
            }
        }) as express.RequestHandler
    ],

    updateItem: [
        rules.param.itemId.required,
        rules.param.itemId.isMongoId,
        rules.body.name.required,
        (async (req, res, next) => {
            try {
                let item = await ItemModel.updateOne(
                    { _id: req.params.itemId },
                    req.body,
                    { upsert: false }
                );
                if (item) {
                    res.status(200).json(item);
                } else {
                    res.status(500).json({ message: `Item does not exist` })
                }
            } catch (err: any) {
                res.status(500).json({
                    message: `Error: ${err.message ?? "unknown error"}`,
                })
            }
        }) as express.RequestHandler
    ],

    deleteItem: [
        rules.param.itemId.required,
        rules.param.itemId.isMongoId,
        (async (req, res, next) => {
            try {
                const deletedItem = await ItemModel.findById(req.params.itemId);
                if (deletedItem) {
                    await deletedItem?.remove();
                    res.status(200).json(deletedItem);
                } else {
                    res.status(500).json({ message: `Item does not exist` })
                }
            } catch (err: any) {
                res.status(500).json({
                    message: `Error: ${err.message ?? "unknown error"}`,
                })
            }
        }) as express.RequestHandler
    ],
});