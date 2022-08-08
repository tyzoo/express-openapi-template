import express from "express";
import { ItemModel } from "../../models/Item";

const itemsController: {[name: string]: express.RequestHandler } = {
    
    createItem: async (req, res, next) => {
        try {
            const item = new ItemModel(req.body);
            await item.save();
            res.status(200).json(item);
        }catch(err: any){
            res.status(500).json({ message: `Error: ${err.message ?? "unknown error"}` })
        }
    },
    
    findItem: async (req, res, next) => {
        const item = await ItemModel.findById(req.params.itemId).select(["-__v"]);
        res.status(200).json(item);
    },

    findAllItems: async (req, res, next) => {
        const items = await ItemModel.find({}).select(["-__v"]);
        res.status(200).json(items);
    },

    updateItem: async (req, res, next) => {
        let item = await ItemModel.updateOne(
            { _id: req.params.itemId },
            req.body,
            { upsert: false }
        );
        if(item){
            res.status(200).json(item);
        }else{
            res.status(500).json({ message: `Item does not exist` })
        }
    },
    
    deleteItem: async (req, res, next) => {
        const deletedItem = await ItemModel.findById(req.params.itemId);
        if(deletedItem){
            await deletedItem?.remove();
            res.status(200).json(deletedItem);
        }else{
            res.status(500).json({ message: `Item does not exist` })
        }
    },
}

export default itemsController;