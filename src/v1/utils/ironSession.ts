import { ironSession } from "iron-session/express";
import * as dotenv from "dotenv";

dotenv.config();

export const ironSessionOptions = {
    cookieName: 'siwe',
    password: process.env.SECRET_COOKIE_PASSWORD!,
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    },
}

export default ironSession(ironSessionOptions);