export * as svgCaptcha from "svg-captcha";
export { svg2png } from "svg-png-converter";

export * as middleware from "../middleware";
export * as models from "../models";

import "./core/sessions";
export { expressAuthentication } from "./core/authentication";
export { controllerLoader } from "./core/controllerLoader";
export { onStart } from "./core/onStart";
export { onEnd } from "./core/onEnd";

export { RegisterRoutes } from "../config/routes";
import * as swaggerDocument from "../config/swagger.json";
export { customCss } from "./misc/customSwaggerCss";
export { swaggerDocument };

export { getTag } from "./misc/getTag";
export { readDir } from "./misc/readDir";
export { requiredEnv, checkEnv } from "./misc/requiredEnv";
export { handleErrors } from "./misc/handleAppErrors";

export class APIError extends Error {
	//eslint-disable-next-line
	constructor(public status: number, public message: string) {
		super(message);
	}
}
