import 'global';
import cors from "cors";
import path from "path";
import helmet from "helmet";
import express from "express";
import mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";
import * as dotenv from "dotenv";
import * as swaggerDocument from './swagger.json';
import { SiweMessage } from 'siwe';
import { ValidateError } from 'tsoa';
import { RegisterRoutes } from "./v2/routes";
import { morganMiddleware } from './v2/middleware/morgan';
import { tag } from './v2/utils/tag';
import { APIError } from './v2/utils';
import ironSession from './v2/middleware/ironSession';

declare module 'iron-session' {
  interface IronSessionData {
    nonce?: string;
    siwe?: SiweMessage;
    jwt?: string;
    captcha?: string;
  }
}

dotenv.config();

const APP_NAME = process.env.APP_NAME;
const PORT = parseInt(process.env.PORT ?? "3000");
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.set('view engine', 'pug');
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      imgSrc: ["'self'", "data:", "blob:", process.env.APP_BASE_URL!],
    },
  }
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

RegisterRoutes(app);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/auth', ironSession, (req, res) => {
  res.render('login', { 
      title: 'Sign in with Ethereum', 
      session: req.session,
  })
});

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(function errorHandler(
  err: unknown,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: `Validation Failed: ${Object.keys(err?.fields ?? {}).map(key => (
        `'${key}': ${err.fields[key].message.replaceAll('"', "'")}`
      )).join(", ")}`,
    });
  }
  if (err instanceof APIError) {
    return res.status(err?.status ?? 500).json({
      message: err?.message ?? `Internal server error`,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: err?.message ?? `Internal server error`,
    });
  }
  next();
});

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
    tag();
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