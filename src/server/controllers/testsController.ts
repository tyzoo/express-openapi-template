import express from "express";
import {
	Get,
	Route,
	Request,
	Middlewares,
	Tags,
	Response,
	Example,
} from "tsoa";
import { ItemModel } from "../models/features/Item";
import createRateLimiter, {
	RateLimitResponse,
} from "../middleware/rateLimitter";

@Route("tests")
@Tags("Tests")
export class TestsController {
	/**
	 * Check if API is online
	 * @summary Check if API is online
	 * @returns If the server is online boolean
	 */
	@Get("")
	@Example<{ online: boolean }>(
		{
			online: true,
		},
		"Successful Response",
	)
	public async checkIfOnline(): Promise<{
		online: boolean;
	}> {
		return { online: true };
	}

	/**
	 * Add 10 test items to DB
	 * @summary Add 10 test items to DB
	 * @returns Status message
	 */
	@Get("add-items")
	@Example<{ message: string }>(
		{
			message: `Added 10 test items to database`,
		},
		"Successful Response",
	)
	public async addItems(): Promise<{
		message: string;
	}> {
		const count = await ItemModel.countDocuments({});
		for (let i = 1 + count; i <= 10 + count; i++) {
			await ItemModel.create({
				name: `Item ${i}`,
			});
		}
		return { message: `Added 10 test items to database` };
	}

	/**
	 * Test Rate Limitter
	 * @summary Test Rate Limitter
	 * @returns { RateLimitResponse }
	 */
	@Get("rate-limiter")
	@Middlewares(
		createRateLimiter({
			prefix: `rateLimitExample`,
			requestLimit: 1,
			secondsPerWindow: 10,
		}),
	)
	@Example<RateLimitResponse>(
		{
			ok: true,
			message: "This request is allowed!",
			requests: 1,
			ttl: 10,
		},
		"Successful Response",
	)
	@Response<RateLimitResponse>(503, "Service Unavailable", {
		ok: false,
		message: "You are being rate limited! Slow down",
		requests: 2,
		ttl: 9,
	})
	public async rateLimiter(
		@Request() req: express.Request,
	): Promise<RateLimitResponse> {
		return {
			ok: true,
			message: `This request is allowed!`,
			...req.res?.locals.rateLimit,
		};
	}
}
