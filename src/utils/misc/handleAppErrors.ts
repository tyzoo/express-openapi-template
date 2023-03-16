import express from "express";
import { ValidateError } from "tsoa";
import { APIError } from "..";

export function handleErrors(app: express.Express) {
	/**
	 * Catch any API validation errors
	 */
	app.use(function errorHandler(
		err: unknown,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	): express.Response | void {
		if (err instanceof ValidateError) {
			console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
			return res.status(422).json({
				message: `Validation Failed: ${Object.keys(err?.fields ?? {})
					.map((key) => `'${key}': ${err.fields[key].message.replace(/"/g, "'")}`)
					.join(", ")}`,
			});
		}
		if (err instanceof APIError) {
			return res.status(err?.status ?? 500).json({
				message: err?.message ?? `Internal server error`,
			});
		}
		if (err instanceof Error) {
			return res.status(500).json({
				message: err?.message ?? `Internal server error`,
			});
		}
		next();
	});

	/**
	 * Catch any 404 errors
	 */
	// @ts-ignore
	app.use(((req, res, next) => {
		const err: any = new Error("Not Found");
		err.status = 404;
		next(err);
	}) as express.RequestHandler);

	// @ts-ignore
	app.use(((err, req, res, next) => {
		res.status(err.status ?? 500).json({
			message: `Internal server error - ${err.message}`,
		});
	}) as express.ErrorRequestHandler);
}
