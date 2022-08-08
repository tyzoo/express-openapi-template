import express from "express";
import { ItemModel } from "../../models/Item";

const testsController: {[name: string]: express.RequestHandler } = {
    
    addItems: async (req, res, next) => {
        const count = await ItemModel.countDocuments({})
        for(let i = 1+count; i <= 10+count; i++){
            await ItemModel.create({
                name: `Item ${i}`,
            })
        }
        res.status(200).json({ message: `Added 10 test items to database` })
    },

    checkConnection: async (req, res, next) => {
        res.status(200).json({ online: true })
    },

}

export default testsController;