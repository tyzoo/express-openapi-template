import chalk from "chalk";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { readDir } from "./misc/readDir";
import dotenv from "dotenv";

dotenv.config();

export async function onStart(app: express.Express) {
    const { MONGO_URI, PORT } = process.env;
    await mongoose.connect(MONGO_URI!);
    const controllers = await readDir(path.join(__dirname, "..", "controllers"), ".ts");
    app.listen(PORT, () => {
        const target = `http://localhost:${PORT}`;
        const messageLines = [
            ``,
            `           Express OpenAPI Server`,
            ``,
            `      ©2023 @tyzoo https://github.com/tyzoo`,
            ``,
            `   📀 Loaded ${controllers.length} API Controllers`,
            `   📀 Connected to MongoDB `,
            `   📀 Connected to Redis `,
            `   🚀 Server running at: ${target}`,
            ``,
        ];
        const longest = [...messageLines].sort((a,b)=>b.length-a.length)[0].length;
        const extraPad = Math.max(longest - 47, 0);
        const border = '*'.repeat(52+extraPad); 
        const message = messageLines.map(line => '     * ' + line.padEnd(50+extraPad) + ' *').join('\n'); 
        const borderAndMessage = [
            '\n\n     *' + border + '*',
            message,
            '     *' + border + '*\n\n', 
        ].join('\n');
        console.log(chalk.hex('#ffffff')(borderAndMessage));
    });
}
export { readDir } from "./misc/readDir";

export { requiredEnv } from "./misc/requiredEnv";

export { handleErrors } from "./handleAppErrors";

export * as svgCaptcha from "svg-captcha";

export { svg2png } from "svg-png-converter";

export class APIError extends Error {
    constructor(public status: number, public message: string) {
        super(message)
    }
}