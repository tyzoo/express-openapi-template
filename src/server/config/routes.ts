/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {
	Controller,
	ValidationService,
	FieldErrors,
	ValidateError,
	TsoaRoute,
	HttpStatusCodeLiteral,
	TsoaResponse,
	fetchMiddlewares,
} from "@tsoa/runtime";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GuestbookController } from "./../controllers/guestbookController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CrudController } from "./../controllers/crudController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CaptchaController } from "./../controllers/auth/captchaController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DCLController } from "./../controllers/dclController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TestsController } from "./../controllers/testsController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ApiKeyController } from "./../controllers/auth/apiKeyController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from "./../controllers/auth/authController";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Web3Controller } from "./../controllers/auth/web3Controller";
import { expressAuthentication } from "./../utils/core/authentication";
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require("promise.any");
import type { RequestHandler, Router } from "express";

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
	Guestbook: {
		dataType: "refObject",
		properties: {
			createdAt: { dataType: "datetime" },
			updatedAt: { dataType: "datetime" },
			address: { dataType: "string", required: true },
			listName: { dataType: "string", required: true },
			message: { dataType: "string", required: true },
		},
		additionalProperties: false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	FlattenMaps_T_: {
		dataType: "refAlias",
		type: {
			dataType: "nestedObjectLiteral",
			nestedProperties: {},
			validators: {},
		},
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	"Document_any.any.any_": {
		dataType: "refAlias",
		type: { ref: "FlattenMaps_T_", validators: {} },
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	Item: {
		dataType: "refObject",
		properties: {
			createdAt: { dataType: "datetime" },
			updatedAt: { dataType: "datetime" },
			name: { dataType: "string", required: true },
			rng: { dataType: "double" },
		},
		additionalProperties: false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	IObjectWithTypegooseFunction: {
		dataType: "refObject",
		properties: {},
		additionalProperties: false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	ObjectId: {
		dataType: "refAlias",
		type: { dataType: "string", validators: {} },
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	FilterQueryParams: {
		dataType: "refObject",
		properties: {
			sort: { dataType: "string" },
			limit: { dataType: "double" },
			page: { dataType: "double" },
		},
		additionalProperties: { dataType: "any" },
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	"mongoose.Types.ObjectId": {
		dataType: "refAlias",
		type: { dataType: "string", validators: {} },
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	Metadata: {
		dataType: "refAlias",
		type: {
			dataType: "nestedObjectLiteral",
			nestedProperties: {
				signer: { dataType: "string", required: true },
				realm: {
					dataType: "nestedObjectLiteral",
					nestedProperties: {
						lighthouseVersion: { dataType: "string" },
						layer: { dataType: "string" },
						catalystName: { dataType: "string" },
						domain: { dataType: "string" },
					},
					required: true,
				},
				isGuest: { dataType: "boolean" },
				network: { dataType: "string" },
				tld: { dataType: "string" },
				parcel: { dataType: "string" },
				sceneId: { dataType: "string" },
				origin: { dataType: "string" },
			},
			validators: {},
		},
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	MetadataResponse: {
		dataType: "refObject",
		properties: {
			address: { dataType: "string", required: true },
			metadata: { ref: "Metadata" },
		},
		additionalProperties: false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	RateLimitResponse: {
		dataType: "refObject",
		properties: {
			ok: { dataType: "boolean", required: true },
			message: { dataType: "string", required: true },
			requests: { dataType: "double", required: true },
			ttl: { dataType: "double", required: true },
		},
		additionalProperties: false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	APIKey_Scopes: {
		dataType: "refEnum",
		enums: ["read", "write"],
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	APIKeyDoc: {
		dataType: "refObject",
		properties: {
			createdAt: { dataType: "datetime" },
			updatedAt: { dataType: "datetime" },
			user: { dataType: "string", required: true },
			name: { dataType: "string", required: true },
			jwt: { dataType: "string" },
			hash: { dataType: "string" },
			expiresAt: { dataType: "datetime", required: true },
			scopes: {
				dataType: "array",
				array: { dataType: "refEnum", ref: "APIKey_Scopes" },
			},
			_id: { dataType: "string", required: true },
		},
		additionalProperties: false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	User_Scopes: {
		dataType: "refEnum",
		enums: ["admin", "user", "banned", "verified"],
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	UserDoc: {
		dataType: "refObject",
		properties: {
			createdAt: { dataType: "datetime" },
			updatedAt: { dataType: "datetime" },
			address: { dataType: "string", required: true },
			nonce: { dataType: "string" },
			scopes: {
				dataType: "array",
				array: { dataType: "refEnum", ref: "User_Scopes" },
			},
			jwt: { dataType: "string" },
			_id: { dataType: "string", required: true },
		},
		additionalProperties: false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	ProfileResponse: {
		dataType: "refObject",
		properties: {
			user: {
				dataType: "union",
				subSchemas: [{ ref: "UserDoc" }, { dataType: "enum", enums: [null] }],
				required: true,
			},
			jwt: { dataType: "string" },
		},
		additionalProperties: false,
	},
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
	// ###########################################################################################################
	//  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
	//      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
	// ###########################################################################################################
	app.get(
		"/guestbook",
		...fetchMiddlewares<RequestHandler>(GuestbookController),
		...fetchMiddlewares<RequestHandler>(
			GuestbookController.prototype.findAllitems,
		),

		function GuestbookController_findAllitems(
			request: any,
			response: any,
			next: any,
		) {
			const args = {};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new GuestbookController();

				const promise = controller.findAllitems.apply(
					controller,
					validatedArgs as any,
				);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.post(
		"/guestbook",
		...fetchMiddlewares<RequestHandler>(GuestbookController),
		...fetchMiddlewares<RequestHandler>(GuestbookController.prototype.createItem),

		function GuestbookController_createItem(
			request: any,
			response: any,
			next: any,
		) {
			const args = {
				body: {
					in: "body",
					name: "body",
					required: true,
					dataType: "nestedObjectLiteral",
					nestedProperties: {
						message: { dataType: "string", required: true },
						address: { dataType: "string", required: true },
					},
				},
				req: { in: "request", name: "req", required: true, dataType: "object" },
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new GuestbookController();

				const promise = controller.createItem.apply(
					controller,
					validatedArgs as any,
				);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.get(
		"/crud",
		...fetchMiddlewares<RequestHandler>(CrudController),
		...fetchMiddlewares<RequestHandler>(CrudController.prototype.findAllItems),

		function CrudController_findAllItems(request: any, response: any, next: any) {
			const args = {
				queryParams: {
					in: "queries",
					name: "queryParams",
					required: true,
					ref: "FilterQueryParams",
				},
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new CrudController();

				const promise = controller.findAllItems.apply(
					controller,
					validatedArgs as any,
				);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.get(
		"/crud/:itemId",
		...fetchMiddlewares<RequestHandler>(CrudController),
		...fetchMiddlewares<RequestHandler>(CrudController.prototype.findItem),

		function CrudController_findItem(request: any, response: any, next: any) {
			const args = {
				itemId: {
					in: "path",
					name: "itemId",
					required: true,
					ref: "mongoose.Types.ObjectId",
				},
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new CrudController();

				const promise = controller.findItem.apply(controller, validatedArgs as any);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.post(
		"/crud",
		...fetchMiddlewares<RequestHandler>(CrudController),
		...fetchMiddlewares<RequestHandler>(CrudController.prototype.createItem),

		function CrudController_createItem(request: any, response: any, next: any) {
			const args = {
				body: {
					in: "body",
					name: "body",
					required: true,
					dataType: "nestedObjectLiteral",
					nestedProperties: { name: { dataType: "string", required: true } },
				},
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new CrudController();

				const promise = controller.createItem.apply(
					controller,
					validatedArgs as any,
				);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.put(
		"/crud/:itemId",
		authenticateMiddleware([{ jwt: ["user"] }]),
		...fetchMiddlewares<RequestHandler>(CrudController),
		...fetchMiddlewares<RequestHandler>(CrudController.prototype.updateItem),

		function CrudController_updateItem(request: any, response: any, next: any) {
			const args = {
				itemId: {
					in: "path",
					name: "itemId",
					required: true,
					ref: "mongoose.Types.ObjectId",
				},
				body: {
					in: "body",
					name: "body",
					required: true,
					dataType: "nestedObjectLiteral",
					nestedProperties: { name: { dataType: "string", required: true } },
				},
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new CrudController();

				const promise = controller.updateItem.apply(
					controller,
					validatedArgs as any,
				);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.delete(
		"/crud/:itemId",
		authenticateMiddleware([{ jwt: ["admin"] }]),
		...fetchMiddlewares<RequestHandler>(CrudController),
		...fetchMiddlewares<RequestHandler>(CrudController.prototype.deleteItem),

		function CrudController_deleteItem(request: any, response: any, next: any) {
			const args = {
				itemId: {
					in: "path",
					name: "itemId",
					required: true,
					ref: "mongoose.Types.ObjectId",
				},
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new CrudController();

				const promise = controller.deleteItem.apply(
					controller,
					validatedArgs as any,
				);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.get(
		"/captcha/new",
		...fetchMiddlewares<RequestHandler>(CaptchaController),
		...fetchMiddlewares<RequestHandler>(CaptchaController.prototype.newCaptcha),

		function CaptchaController_newCaptcha(
			request: any,
			response: any,
			next: any,
		) {
			const args = {
				req: { in: "request", name: "req", required: true, dataType: "object" },
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new CaptchaController();

				const promise = controller.newCaptcha.apply(
					controller,
					validatedArgs as any,
				);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.post(
		"/captcha/verify",
		...fetchMiddlewares<RequestHandler>(CaptchaController),
		...fetchMiddlewares<RequestHandler>(
			CaptchaController.prototype.getSiweMessage,
		),

		function CaptchaController_getSiweMessage(
			request: any,
			response: any,
			next: any,
		) {
			const args = {
				body: {
					in: "body",
					name: "body",
					required: true,
					dataType: "nestedObjectLiteral",
					nestedProperties: { code: { dataType: "string", required: true } },
				},
				req: { in: "request", name: "req", required: true, dataType: "object" },
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new CaptchaController();

				const promise = controller.getSiweMessage.apply(
					controller,
					validatedArgs as any,
				);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.get(
		"/dcl/optional",
		...fetchMiddlewares<RequestHandler>(DCLController),
		...fetchMiddlewares<RequestHandler>(DCLController.prototype.optional),

		function DCLController_optional(request: any, response: any, next: any) {
			const args = {
				_req: { in: "request", name: "_req", required: true, dataType: "object" },
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new DCLController();

				const promise = controller.optional.apply(controller, validatedArgs as any);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.get(
		"/dcl/required",
		...fetchMiddlewares<RequestHandler>(DCLController),
		...fetchMiddlewares<RequestHandler>(DCLController.prototype.required),

		function DCLController_required(request: any, response: any, next: any) {
			const args = {
				_req: { in: "request", name: "_req", required: true, dataType: "object" },
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new DCLController();

				const promise = controller.required.apply(controller, validatedArgs as any);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.get(
		"/tests",
		...fetchMiddlewares<RequestHandler>(TestsController),
		...fetchMiddlewares<RequestHandler>(TestsController.prototype.checkIfOnline),

		function TestsController_checkIfOnline(
			request: any,
			response: any,
			next: any,
		) {
			const args = {};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new TestsController();

				const promise = controller.checkIfOnline.apply(
					controller,
					validatedArgs as any,
				);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.get(
		"/tests/add-items",
		...fetchMiddlewares<RequestHandler>(TestsController),
		...fetchMiddlewares<RequestHandler>(TestsController.prototype.addItems),

		function TestsController_addItems(request: any, response: any, next: any) {
			const args = {};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new TestsController();

				const promise = controller.addItems.apply(controller, validatedArgs as any);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.get(
		"/tests/rate-limiter",
		...fetchMiddlewares<RequestHandler>(TestsController),
		...fetchMiddlewares<RequestHandler>(TestsController.prototype.rateLimiter),

		function TestsController_rateLimiter(request: any, response: any, next: any) {
			const args = {
				req: { in: "request", name: "req", required: true, dataType: "object" },
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new TestsController();

				const promise = controller.rateLimiter.apply(
					controller,
					validatedArgs as any,
				);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.get(
		"/api-keys",
		authenticateMiddleware([{ siwe: ["user"] }]),
		...fetchMiddlewares<RequestHandler>(ApiKeyController),
		...fetchMiddlewares<RequestHandler>(ApiKeyController.prototype.findAllitems),

		function ApiKeyController_findAllitems(
			request: any,
			response: any,
			next: any,
		) {
			const args = {
				req: { in: "request", name: "req", required: true, dataType: "object" },
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new ApiKeyController();

				const promise = controller.findAllitems.apply(
					controller,
					validatedArgs as any,
				);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.post(
		"/api-keys",
		authenticateMiddleware([{ siwe: ["user"] }]),
		...fetchMiddlewares<RequestHandler>(ApiKeyController),
		...fetchMiddlewares<RequestHandler>(ApiKeyController.prototype.createApiKey),

		function ApiKeyController_createApiKey(
			request: any,
			response: any,
			next: any,
		) {
			const args = {
				req: { in: "request", name: "req", required: true, dataType: "object" },
				body: {
					in: "body",
					name: "body",
					required: true,
					dataType: "nestedObjectLiteral",
					nestedProperties: {
						tokenName: { dataType: "string", required: true },
						scopes: {
							dataType: "array",
							array: { dataType: "refEnum", ref: "APIKey_Scopes" },
							required: true,
						},
						expiresInDays: { dataType: "double", required: true },
					},
				},
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new ApiKeyController();

				const promise = controller.createApiKey.apply(
					controller,
					validatedArgs as any,
				);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.post(
		"/auth/nonce",
		...fetchMiddlewares<RequestHandler>(AuthController),
		...fetchMiddlewares<RequestHandler>(AuthController.prototype.nonce),

		function AuthController_nonce(request: any, response: any, next: any) {
			const args = {
				body: {
					in: "body",
					name: "body",
					required: true,
					dataType: "nestedObjectLiteral",
					nestedProperties: { address: { dataType: "string", required: true } },
				},
				req: { in: "request", name: "req", required: true, dataType: "object" },
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new AuthController();

				const promise = controller.nonce.apply(controller, validatedArgs as any);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.post(
		"/auth/siwe-payload",
		...fetchMiddlewares<RequestHandler>(AuthController),
		...fetchMiddlewares<RequestHandler>(AuthController.prototype.getSiweMessage),

		function AuthController_getSiweMessage(
			request: any,
			response: any,
			next: any,
		) {
			const args = {
				body: {
					in: "body",
					name: "body",
					required: true,
					dataType: "nestedObjectLiteral",
					nestedProperties: {
						nonce: { dataType: "string", required: true },
						address: { dataType: "string", required: true },
					},
				},
				req: { in: "request", name: "req", required: true, dataType: "object" },
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new AuthController();

				const promise = controller.getSiweMessage.apply(
					controller,
					validatedArgs as any,
				);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.post(
		"/auth/login",
		...fetchMiddlewares<RequestHandler>(AuthController),
		...fetchMiddlewares<RequestHandler>(AuthController.prototype.login),

		function AuthController_login(request: any, response: any, next: any) {
			const args = {
				expiresIn: {
					in: "query",
					name: "expiresIn",
					required: true,
					dataType: "string",
				},
				body: {
					in: "body",
					name: "body",
					required: true,
					dataType: "nestedObjectLiteral",
					nestedProperties: {
						siwe: {
							dataType: "nestedObjectLiteral",
							nestedProperties: {
								payload: { dataType: "string", required: true },
								signature: { dataType: "string", required: true },
								address: { dataType: "string", required: true },
							},
							required: true,
						},
					},
				},
				req: { in: "request", name: "req", required: true, dataType: "object" },
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new AuthController();

				const promise = controller.login.apply(controller, validatedArgs as any);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.get(
		"/auth/logout",
		...fetchMiddlewares<RequestHandler>(AuthController),
		...fetchMiddlewares<RequestHandler>(AuthController.prototype.logout),

		function AuthController_logout(request: any, response: any, next: any) {
			const args = {
				req: { in: "request", name: "req", required: true, dataType: "object" },
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new AuthController();

				const promise = controller.logout.apply(controller, validatedArgs as any);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.get(
		"/auth/profile",
		...fetchMiddlewares<RequestHandler>(AuthController),
		...fetchMiddlewares<RequestHandler>(AuthController.prototype.profile),

		function AuthController_profile(request: any, response: any, next: any) {
			const args = {
				req: { in: "request", name: "req", required: true, dataType: "object" },
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new AuthController();

				const promise = controller.profile.apply(controller, validatedArgs as any);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.get(
		"/web3/wallet",
		authenticateMiddleware([{ siwe: ["user"] }]),
		...fetchMiddlewares<RequestHandler>(Web3Controller),
		...fetchMiddlewares<RequestHandler>(Web3Controller.prototype.wallet),

		function Web3Controller_wallet(request: any, response: any, next: any) {
			const args = {};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new Web3Controller();

				const promise = controller.wallet.apply(controller, validatedArgs as any);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.get(
		"/web3/ens/resolve/:name",
		authenticateMiddleware([{ siwe: ["user"] }]),
		...fetchMiddlewares<RequestHandler>(Web3Controller),
		...fetchMiddlewares<RequestHandler>(Web3Controller.prototype.ensResolve),

		function Web3Controller_ensResolve(request: any, response: any, next: any) {
			const args = {
				name: { in: "path", name: "name", required: true, dataType: "string" },
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new Web3Controller();

				const promise = controller.ensResolve.apply(
					controller,
					validatedArgs as any,
				);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
	app.get(
		"/web3/ens/lookup/:address",
		authenticateMiddleware([{ siwe: ["user"] }]),
		...fetchMiddlewares<RequestHandler>(Web3Controller),
		...fetchMiddlewares<RequestHandler>(Web3Controller.prototype.en),

		function Web3Controller_en(request: any, response: any, next: any) {
			const args = {
				address: {
					in: "path",
					name: "address",
					required: true,
					dataType: "string",
				},
			};

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			let validatedArgs: any[] = [];
			try {
				validatedArgs = getValidatedArgs(args, request, response);

				const controller = new Web3Controller();

				const promise = controller.en.apply(controller, validatedArgs as any);
				promiseHandler(controller, promise, response, undefined, next);
			} catch (err) {
				return next(err);
			}
		},
	);
	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

	function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
		return async function runAuthenticationMiddleware(
			request: any,
			_response: any,
			next: any,
		) {
			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			// keep track of failed auth attempts so we can hand back the most
			// recent one.  This behavior was previously existing so preserving it
			// here
			const failedAttempts: any[] = [];
			const pushAndRethrow = (error: any) => {
				failedAttempts.push(error);
				throw error;
			};

			const secMethodOrPromises: Promise<any>[] = [];
			for (const secMethod of security) {
				if (Object.keys(secMethod).length > 1) {
					const secMethodAndPromises: Promise<any>[] = [];

					for (const name in secMethod) {
						secMethodAndPromises.push(
							expressAuthentication(request, name, secMethod[name]).catch(
								pushAndRethrow,
							),
						);
					}

					// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

					secMethodOrPromises.push(
						Promise.all(secMethodAndPromises).then((users) => {
							return users[0];
						}),
					);
				} else {
					for (const name in secMethod) {
						secMethodOrPromises.push(
							expressAuthentication(request, name, secMethod[name]).catch(
								pushAndRethrow,
							),
						);
					}
				}
			}

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

			try {
				request["user"] = await promiseAny.call(Promise, secMethodOrPromises);
				next();
			} catch (err) {
				// Show most recent error as response
				const error = failedAttempts.pop();
				error.status = error.status || 401;
				next(error);
			}

			// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
		};
	}

	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

	function isController(object: any): object is Controller {
		return (
			"getHeaders" in object && "getStatus" in object && "setStatus" in object
		);
	}

	function promiseHandler(
		controllerObj: any,
		promise: any,
		response: any,
		successStatus: any,
		next: any,
	) {
		return Promise.resolve(promise)
			.then((data: any) => {
				let statusCode = successStatus;
				let headers;
				if (isController(controllerObj)) {
					headers = controllerObj.getHeaders();
					statusCode = controllerObj.getStatus() || statusCode;
				}

				// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

				returnHandler(response, statusCode, data, headers);
			})
			.catch((error: any) => next(error));
	}

	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

	function returnHandler(
		response: any,
		statusCode?: number,
		data?: any,
		headers: any = {},
	) {
		if (response.headersSent) {
			return;
		}
		Object.keys(headers).forEach((name: string) => {
			response.set(name, headers[name]);
		});
		if (
			data &&
			typeof data.pipe === "function" &&
			data.readable &&
			typeof data._read === "function"
		) {
			response.status(statusCode || 200);
			data.pipe(response);
		} else if (data !== null && data !== undefined) {
			response.status(statusCode || 200).json(data);
		} else {
			response.status(statusCode || 204).end();
		}
	}

	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

	function responder(
		response: any,
	): TsoaResponse<HttpStatusCodeLiteral, unknown> {
		return function (status, data, headers) {
			returnHandler(response, status, data, headers);
		};
	}

	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

	function getValidatedArgs(args: any, request: any, response: any): any[] {
		const fieldErrors: FieldErrors = {};
		const values = Object.keys(args).map((key) => {
			const name = args[key].name;
			switch (args[key].in) {
				case "request":
					return request;
				case "query":
					return validationService.ValidateParam(
						args[key],
						request.query[name],
						name,
						fieldErrors,
						undefined,
						{ noImplicitAdditionalProperties: "throw-on-extras" },
					);
				case "queries":
					return validationService.ValidateParam(
						args[key],
						request.query,
						name,
						fieldErrors,
						undefined,
						{ noImplicitAdditionalProperties: "throw-on-extras" },
					);
				case "path":
					return validationService.ValidateParam(
						args[key],
						request.params[name],
						name,
						fieldErrors,
						undefined,
						{ noImplicitAdditionalProperties: "throw-on-extras" },
					);
				case "header":
					return validationService.ValidateParam(
						args[key],
						request.header(name),
						name,
						fieldErrors,
						undefined,
						{ noImplicitAdditionalProperties: "throw-on-extras" },
					);
				case "body":
					return validationService.ValidateParam(
						args[key],
						request.body,
						name,
						fieldErrors,
						undefined,
						{ noImplicitAdditionalProperties: "throw-on-extras" },
					);
				case "body-prop":
					return validationService.ValidateParam(
						args[key],
						request.body[name],
						name,
						fieldErrors,
						"body.",
						{ noImplicitAdditionalProperties: "throw-on-extras" },
					);
				case "formData":
					if (args[key].dataType === "file") {
						return validationService.ValidateParam(
							args[key],
							request.file,
							name,
							fieldErrors,
							undefined,
							{ noImplicitAdditionalProperties: "throw-on-extras" },
						);
					} else if (
						args[key].dataType === "array" &&
						args[key].array.dataType === "file"
					) {
						return validationService.ValidateParam(
							args[key],
							request.files,
							name,
							fieldErrors,
							undefined,
							{ noImplicitAdditionalProperties: "throw-on-extras" },
						);
					} else {
						return validationService.ValidateParam(
							args[key],
							request.body[name],
							name,
							fieldErrors,
							undefined,
							{ noImplicitAdditionalProperties: "throw-on-extras" },
						);
					}
				case "res":
					return responder(response);
			}
		});

		if (Object.keys(fieldErrors).length > 0) {
			throw new ValidateError(fieldErrors, "");
		}
		return values;
	}

	// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
