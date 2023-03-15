
import {
    generateRoutes,
    generateSpec,
    ExtendedRoutesConfig,
    ExtendedSpecConfig,
} from "tsoa";
import dotenv from "dotenv";
import { checkEnv } from "../src/v2/utils";
dotenv.config();

checkEnv();

(async () => {
    const specOptions: ExtendedSpecConfig = {
        noImplicitAdditionalProperties: "throw-on-extras",
        controllerPathGlobs: [
            `./src${process.env.APP_BASE_PATH}/controllers/**/*.ts`
        ],
        outputDirectory: "./src",
        name: process.env.APP_NAME,
        description: process.env.APP_DESCRIPTION,
        contact: {
            name: "@tyzoo",
            url: "https://github.com/tyzoo",
            email: "tyler.russell.design@gmail.com"
        },
        basePath: process.env.APP_BASE_PATH,
        entryFile: "./src/index.ts",
        specVersion: 3,
        securityDefinitions: {
            api_key: {
                type: "apiKey",
                name: "access_token",
                in: "query"
            },
            jwt: {
                type: "apiKey",
                name: "authorization",
                in: "header",
            },
            tsoa_auth: {
                type: "oauth2",
                authorizationUrl: "http://swagger.io/api/oauth/dialog",
                flow: "implicit",
                scopes: {
                    "write:pets": "modify things",
                    "read:pets": "read things"
                }
            }
        },
        tags: [
            {
                name: "Authentication",
                description: "Authenticate using Sign in With Ethereum (SIWE) [Connect Wallet](./../auth)"
            },
            {
                name: "CRUD",
                description: "A set of example CRUD routes"
            },
            {
                name: "Tests",
                description: "Test if the API is up and running"
            },
            {
                name: "Decentraland",
                description: "Example routes enforcing DCL middleware"
            }
        ]
    };

    const routeOptions: ExtendedRoutesConfig = {
        noImplicitAdditionalProperties: "throw-on-extras",
        basePath: process.env.APP_BASE_PATH,
        entryFile: "./src/index.ts",
        routesDir: `./src${process.env.APP_BASE_PATH}`,
        authenticationModule: `./src${process.env.APP_BASE_PATH}/authentication.ts`
    };

    await generateSpec(specOptions);
    console.log(`✅ Generated OpenAPI Spec`)
    
    await generateRoutes(routeOptions);
    console.log(`✅ Generated OpenAPI Routes`)
})();