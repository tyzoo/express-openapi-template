import cors from "cors";
import express from "express";
import swaggerUI from "swagger-ui-express"
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import v1Router from "./v1/router"
import v1ApiInfo from "./v1/apiInfo";

dotenv.config();

const APP_NAME = process.env.APP_NAME;
const PORT = parseInt(process.env.PORT ?? "3000");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/v1", v1Router);
app.use("/", swaggerUI.serve, swaggerUI.setup(v1ApiInfo.docs));

app.use(((err, req, res, next) => {
    res.status(err.status).json(err);
}) as express.ErrorRequestHandler);

app.listen(PORT, () => {
    console.log(`${APP_NAME} server started at http://localhost:${PORT}`);
});