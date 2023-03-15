import "./core/sessions";
export { expressAuthentication }from "./core/authentication";

export { RegisterRoutes } from "../config/routes";
import * as swaggerDocument from '../config/swagger.json';
export { swaggerDocument };

export { onStart } from "./misc/onStart";
export { readDir } from "./misc/readDir";
export { requiredEnv, checkEnv } from "./misc/requiredEnv";
export { handleErrors } from "./misc/handleAppErrors";

export * as svgCaptcha from "svg-captcha";
export { svg2png } from "svg-png-converter";


export class APIError extends Error {
  constructor(public status: number, public message: string) {
    super(message)
  }
}