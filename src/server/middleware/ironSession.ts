import * as dotenv from "dotenv";
import { ironSession } from "iron-session/express";

dotenv.config();

export const ironSessionOptions = {
	cookieName: "siwe",
	password: process.env.SECRET_COOKIE_PASSWORD!,
	cookieOptions: {
		secure: process.env.NODE_ENV === "production",
	},
};

export default ironSession(ironSessionOptions);
