import path from "path";
import cors from "cors";
import express from "express";
import swagger from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import v1Router from "./v1/routes/data"

dotenv.config();

const APP_NAME = process.env.APP_NAME;
const APP_BASE_URL = process.env.APP_BASE_URL;
const APP_TITLE = process.env.APP_TITLE;
const APP_DESCRIPTION = process.env.APP_DESCRIPTION;
const PORT = parseInt(process.env.PORT ?? "3000");

const swaggerConfig = {
    swaggerDefinition: {
        info: {
            title: APP_TITLE!,
            description: APP_DESCRIPTION!,
            version: "1.0.0",
            contact: {
                name: '@tyzoo',
                url: `https://github.com/tyzoo`
            },
        },
        host: APP_BASE_URL,
        basePath: `/v1`,
    },
    apis: [path.join(__dirname, "v1", "routes", "*")]
}
const swaggerDocs = swagger(swaggerConfig);

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/v1", v1Router);
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(((err, req, res, next) => {
    res.status(err.status).json(err);
}) as express.ErrorRequestHandler);

app.listen(PORT, () => {
    console.log(`${APP_NAME} server started at http://localhost:${PORT}`);
});