import express from "express";
import * as dotenv from "dotenv";
import v1Router from "./v1/router";
import v1ApiInfo from "./v1/apiInfo";

dotenv.config();

const APP_BASE_URL = process.env.APP_BASE_URL;
const router = express.Router();

router.get("/", ((req, res, next) => {
    res.status(200).json({
        api: `${APP_BASE_URL}/v1`,
        docs: `${APP_BASE_URL}/docs`,
        info: v1ApiInfo.config.swaggerDefinition.info,
    })
}) as express.RequestHandler);

router.use("/v1", v1Router);

export default router;