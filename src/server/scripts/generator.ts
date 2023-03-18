import {
	generateRoutes,
	generateSpec,
	ExtendedRoutesConfig,
	ExtendedSpecConfig,
} from "tsoa";
import dotenv from "dotenv";
import { checkEnv } from "../utils";

dotenv.config();

const basePath =
	process.env.APP_BASE_PATH === "/" ? "" : process.env.APP_BASE_PATH;
(async () => {
	checkEnv();
	const specOptions: ExtendedSpecConfig = {
		noImplicitAdditionalProperties: "throw-on-extras",
		controllerPathGlobs: [`./src${basePath}/server/controllers/**/*.ts`],
		outputDirectory: `./src${basePath}/server/config`,
		name: process.env.APP_NAME,
		description: process.env.APP_DESCRIPTION,
		contact: {
			name: "@tyzoo",
			url: "https://github.com/tyzoo",
			email: "tyler.russell.design@gmail.com",
		},
		basePath: process.env.APP_BASE_PATH,
		entryFile: "./src/server/index.ts",
		specVersion: 3,
		securityDefinitions: {
			"api-key": {
				type: "apiKey",
				name: "token",
				in: "query",
			},
			siwe: {
				type: "apiKey",
				name: "authorization",
				in: "header",
			},
		},
		tags: [
			{
				name: "Authentication",
				description:
					"Authenticate using Sign in With Ethereum (SIWE) [Connect Wallet](./../auth)",
			},
			{
				name: "APIKeys",
				description: "Generate API keys for interacting with protected API routes",
			},
			{
				name: "Captcha",
				description: "Simple Captcha Verification Example",
			},
			{
				name: "CRUD",
				description: "A set of example CRUD routes",
			},
			{
				name: "Web3",
				description: "Web3 Related API Routes",
			},
			{
				name: "Decentraland",
				description: "Example routes enforcing DCL middleware",
			},
			{
				name: "Tests",
				description: "Test if the API is up and running",
			},
			{
				name: "Guestbook",
				description: "Guestbook API Routes",
			},
		],
	};

	const routeOptions: ExtendedRoutesConfig = {
		noImplicitAdditionalProperties: "throw-on-extras",
		basePath: process.env.APP_BASE_PATH,
		entryFile: "./src/server/index.ts",
		routesDir: `./src${basePath}/server/config`,
		authenticationModule: `./src${basePath}/server/utils/core/authentication.ts`,
	};

	await generateSpec(specOptions);
	console.log(`✅ Generated OpenAPI Spec`);

	await generateRoutes(routeOptions);
	console.log(`✅ Generated OpenAPI Routes`);

	process.exit(0);
})();
