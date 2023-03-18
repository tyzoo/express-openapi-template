import jwt from "jsonwebtoken";
import express from "express";
import { ethers } from "ethers";
import { generateNonce, SiweMessage } from "siwe";
import {
	Get,
	Route,
	Request,
	Tags,
	Body,
	Post,
	Response,
	Example,
	Query,
} from "tsoa";
import { User_Scopes, User, UserModel } from "../../models";
import { APIError } from "../../utils";
import { TokenService, TOKEN_TYPES } from "../../services/tokenService";

interface UserDoc extends User {
	_id: string;
}
interface ProfileResponse {
	user: UserDoc | null;
	jwt?: string;
}

@Route("auth")
@Tags("Authentication")
@Response<{ message: string }>(401, "Unauthorized", {
	message: `Unauthorized request`,
})
export class AuthController {
	/**
	 * Get a nonce for a user
	 * @summary Get a new nonce
	 * @returns Nonce for user
	 */
	@Post("nonce")
	@Example<{ nonce: string }>(
		{
			nonce: "MQ4YUxu1R1WUqwerty",
		},
		"Successful Response",
	)
	public async nonce(
		@Body() body: { address: string },
		@Request() req: express.Request,
	): Promise<{ nonce: string }> {
		let { address } = body;
		try {
			address = ethers.utils.getAddress(address);
		} catch {
			throw new APIError(401, `Invalid ethereum address`);
		}
		const nonce = generateNonce();
		req.session.nonce = nonce;
		await req.session.save();
		let user = await UserModel.findOne({ address });
		if (!user) {
			user = await UserModel.create({ address, nonce });
		} else {
			user.nonce = nonce;
			await user.save();
		}
		return { nonce };
	}

	/**
	 * Get a SIWE Payload for an address/nonce
	 * @summary Get a SIWE Payload
	 * @param address Ethereum Address
	 * @param nonce Current Nonce
	 * @returns { string } Raw SIWE Payload as a string, to be signed
	 */
	@Post("siwe-payload")
	@Example<{ message: string }>(
		{
			message:
				"express-openapi-ts-app.herokuapp.com wants you to sign in with your Ethereum account:\n0x12345...\n\nSign in with Ethereum to the app.\n\nURI: https://express-openapi-ts-app.herokuapp.com\nVersion: 1\nChain ID: 1\nNonce: MQ4YUxu1R1WUqwerty\nIssued At: 2023-03-15T02:28:43.469Z",
		},
		"Successful Response",
	)
	public async getSiweMessage(
		@Body()
		body: {
			address: string;
			nonce: string;
		},
		@Request() req: express.Request,
	): Promise<{ message: string }> {
		let { address } = body;
		const domain = req.hostname;
		const origin = req.headers.origin;
		try {
			address = ethers.utils.getAddress(address);
		} catch {
			throw new APIError(401, `Invalid ethereum address`);
		}
		let checkNonce = req.session.nonce;
		if (!checkNonce) {
			const user = await UserModel.findOne({ address });
			if (!user) throw new APIError(401, `Invalid user`);
			if (!user.nonce) throw new APIError(401, `Missing nonce on user`);
			checkNonce = user.nonce;
		}
		const { nonce } = body;
		if (!nonce || !checkNonce || nonce !== checkNonce) {
			throw new APIError(401, `Invalid nonce`);
		}
		const siweMessage = new SiweMessage({
			domain,
			address,
			statement: `Sign in with Ethereum to the app.`,
			uri: origin,
			version: "1",
			nonce,
			chainId: 1,
		});
		return { message: siweMessage.prepareMessage() };
	}

	/**
	 * Login with SIWE
	 * @summary Login with SIWE
	 * @param body SIWE Object with address, signature, payload
	 * @returns Success boolean
	 */
	@Post("login")
	@Example<{ success: boolean }>(
		{
			success: true,
		},
		"Successful Response",
	)
	public async login(
		/**
		 * @example { expiresIn: "365d" }
		 */
		@Query("expiresIn") expiresIn: string,
		@Body()
		body: {
			siwe: {
				address: string;
				signature: string;
				payload: string;
			};
		},
		@Request() req: express.Request,
	): Promise<{ success: boolean }> {
		const {
			siwe: { signature, payload },
		} = body;
		const siweMessage = new SiweMessage(payload);
		const fields = await siweMessage.validate(signature);
		const { address, nonce } = fields;
		if (nonce !== req.session.nonce) throw new APIError(401, `Invalid nonce`);
		let user = await UserModel.findOne({ address });
		if (!user) user = await UserModel.create({ address });
		req.session.siwe = fields;
		const token = await TokenService.issueToken(
			TOKEN_TYPES.SIWE,
			user._id,
			{
				siwe: fields,
				tokenName: "siwe",
			},
			expiresIn,
		);
		req.session.jwt = token;
		await req.session.save();
		user.jwt = token;
		if (!user.scopes?.includes(User_Scopes.USER)) {
			user.scopes?.push(User_Scopes.USER);
		}
		await user.save();
		return { success: true };
	}

	/**
	 * Logout from SIWE
	 * @summary Logout from SIWE
	 * @returns Success boolean
	 */
	@Get("logout")
	@Example<{ success: boolean }>(
		{
			success: true,
		},
		"Successful Response",
	)
	public async logout(
		@Request() req: express.Request,
	): Promise<{ success: boolean }> {
		if (req.session?.jwt) {
			const payload = jwt.decode(req.session.jwt) as jwt.JwtPayload;
			if (payload?.user) {
				const user = await UserModel.findById(payload.user._id);
				if (user) {
					user.jwt = undefined;
					await user.save();
				}
			}
			req.session.destroy();
			return { success: true };
		} else {
			return { success: false };
		}
	}

	/**
	 * Get SIWE Profile
	 * @summary Get SIWE Profile
	 * @returns { ProfileResponse } User object and JWT for the logged in user
	 */
	@Get("profile")
	@Example<ProfileResponse>(
		{
			user: {
				_id: "632a1ed547dcfbc73c912345",
				address: "0x3C815A79f52A07AD30a8Ad299F68D0C328E12345",
				nonce: "ItiFRj6T1rQaqwerty",
				updatedAt: new Date("2023-03-15T01:29:47.938Z"),
			},
			jwt: "eyfrgGciJ...",
		},
		"Successful Response",
	)
	public async profile(
		@Request() req: express.Request,
	): Promise<ProfileResponse> {
		const address = req.session.siwe?.address;
		const jwt = req.session?.jwt;
		if (!address) throw new APIError(401, "Session not found");
		const user = await UserModel.findOne({ address });
		if (!user) throw new APIError(401, "User not found");
		return { user, jwt };
	}
}
