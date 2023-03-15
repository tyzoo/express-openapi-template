import "global";
import "./sessions";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import express from "express";
import swaggerUI from "swagger-ui-express";
import * as dotenv from "dotenv";
import * as swaggerDocument from './swagger.json';
import { RegisterRoutes } from "./v2/routes";
import { onStart, handleErrors, checkEnv } from './v2/utils';
import { ironSession, morganMiddleware } from './v2/middleware';

dotenv.config();
checkEnv();
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

handleErrors(app);

app.disable('x-powered-by');

void onStart(app);