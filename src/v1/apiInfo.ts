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
        servers: [
            {
                url: `${APP_BASE_URL}/v1`,
                description: `V1 api`,
            }
        ],
        tags: [
            {
                name: `crud`,
                description: `A set of example CRUD routes`,
            },
            {
                name: `test`,
                description: `Test if the API is up and running`,
            },
        ]
    },
    apis: [
        path.join(__dirname, "routes", "*"),
    ]
}
const docs = swagger(config);

const v1ApiInfo = {
    config,
    docs,
};

export default v1ApiInfo;