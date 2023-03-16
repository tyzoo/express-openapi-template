import { SiweMessage } from "siwe";
import "iron-session";

declare module "iron-session" {
	interface IronSessionData {
		nonce?: string;
		siwe?: SiweMessage;
		jwt?: string;
		captcha?: string;
	}
}
