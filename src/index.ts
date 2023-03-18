import "global";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import express from "express";
import swaggerUI from "swagger-ui-express";
import * as dotenv from "dotenv";
import {
	RegisterRoutes,
	onStart,
	onEnd,
	handleErrors,
	checkEnv,
	swaggerDocument,
	controllerLoader,
	middleware,
	customCss,
} from "./utils";

const {
	ironSession,
	morganMiddleware,
} = middleware;

dotenv.config();
checkEnv();

const ctrlCount = controllerLoader();
const app = express();
app.set("APP_NAME", process.env.APP_NAME);
app.set("view engine", "pug");
app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				imgSrc: ["'self'", "data:", "blob:", process.env.APP_BASE_URL!],
			},
		},
	}),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);
app.use(ironSession);

RegisterRoutes(app);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument, {
	customCss,
}));
app.get("/auth", (req, res) => {
	res.render("login", {
		title: "Sign in with Ethereum",
		session: req.session,
	});
});
// @ts-ignore
app.get("/", (req, res) => {
	res.status(200).json({
		message: `${app.get("APP_NAME")} is online :)`
	});
});
app.use(express.static(path.join(__dirname, "..", "public")));

handleErrors(app);

app.disable("x-powered-by");

void onStart(app, ctrlCount);
void onEnd(app);
