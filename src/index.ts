import cors from "cors";
import helmet from "helmet";
import express from "express";
import mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import appRouter from "./appRouter";
import v1ApiInfo from "./v1/apiInfo";

dotenv.config();

const APP_NAME = process.env.APP_NAME;
const PORT = parseInt(process.env.PORT ?? "3000");
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", appRouter);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(v1ApiInfo.docs));

app.use(((req, res, next) => {
    var err: any = new Error('Not Found');
    err.status = 404;
    next(err);
}) as express.RequestHandler);

app.use(((err, req, res, next) => {
    res.status(err.status ?? 500).json({
        message: `Internal server error - ${err.message}`,
    })
}) as express.ErrorRequestHandler);

app.disable('x-powered-by');

const start = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URI!);
        app.listen(PORT, () => {
            console.log(`${APP_NAME} server started at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

void start();