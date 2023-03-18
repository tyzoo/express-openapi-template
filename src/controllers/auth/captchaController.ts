import express from "express";
import {
	Get,
	Route,
	Request,
	Tags,
	Body,
	Post,
	Response,
	Example,
} from "tsoa";
import { APIError, svg2png, svgCaptcha } from "../../utils";

@Route("captcha")
@Tags("Captcha")
@Response<{ message: string }>(401, "Unauthorized", {
	message: `Unauthorized request`,
})
export class CaptchaController {
	/**
	 * Generate a new Captcha
	 * @summary Generate a new Captcha
	 * @returns Captcha Image (PNG Format)
	 */
	@Get("new")
	public async newCaptcha(@Request() req: express.Request): Promise<null> {
		const res = req.res;
		const captcha = svgCaptcha.create({
			size: 6,
			noise: 6,
			width: 300,
			height: 100,
			ignoreChars: "0o1iIlO",
		});
		const png = await svg2png({
			input: captcha.data.trim(),
			encoding: "dataURL",
			format: "png",
		});
		req.session.captcha = captcha.text;
		await req.session.save();
		const img = Buffer.from(
			png.replace(/^data:image\/png;base64,/, ""),
			"base64",
		);

		res!.writeHead(200, {
			"Content-Type": "image/png",
			"Content-Length": img.length,
		});
		res!.end(img);
		return null;
	}

	/**
	 * Verify a Captcha
	 * @summary Verify a Captcha
	 * @param code Code to solve current captcha
	 * @returns Success Boolean
	 */
	@Post("verify")
	@Example<{ success: boolean }>(
		{
			success: true,
		},
		"Successful Response",
	)
	public async getSiweMessage(
		@Body()
		body: {
			code: string;
		},
		@Request() req: express.Request,
	): Promise<{ success: boolean }> {
		const { code } = body;
		const sessionCode = req.session.captcha;
		if (!(code && sessionCode && code === sessionCode)) {
			throw new APIError(403, `Invalid code`);
		}
		return { success: true };
	}
}
