import path from "path";
import swagger from "swagger-jsdoc"
import * as dotenv from "dotenv";
dotenv.config();

const APP_BASE_URL = process.env.APP_BASE_URL;
const APP_TITLE = process.env.APP_TITLE;
const APP_DESCRIPTION = process.env.APP_DESCRIPTION;

const config = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: APP_TITLE!,
            description: APP_DESCRIPTION!,
            version: "1.0.0",
            contact: {
                name: '@tyzoo',
                url: `https://github.com/tyzoo`,
                email: `tyler.russell.design@gmail.com`,
            },
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }],
        servers: [
            {
                url: `${APP_BASE_URL}/v1`,
                description: `V1 api`,
            }
        ],
        tags: [
            {
                name: `Authentication`,
                description: `Authenticate using Sign in With Ethereum (SIWE) [Connect Wallet](./../v1/auth)`,
            },
            {
                name: `CRUD`,
                description: `A set of example CRUD routes`,
            },
            {
                name: `Tests`,
                description: `Test if the API is up and running`,
            },
            {
                name: `Decentraland`,
                description: `Example routes enforcing DCL middleware`,
            },

        ],
    },
    apis: [
        path.join(__dirname, "routes", "*"),
    ],
}

const docs = swagger(config);

const v1ApiInfo = {
    config,
    docs,
};

export default v1ApiInfo;