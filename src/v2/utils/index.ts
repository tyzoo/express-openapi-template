import chalk from "chalk";

export function tag () {
    console.log([
        chalk.hex('#ffffff').bold('\n⚙️ ZooTools Express OpenAPI Server ⚙️'),
        chalk.hex('#ffffff')('By [@tyzoo](https://github.com/tyzoo)\n'),
    ].join('\n'));
}

export * as svgCaptcha from "svg-captcha";

export { svg2png } from "svg-png-converter";

export class APIError extends Error {
    constructor(public status: number, public message: string){
        super(message)
    }
}