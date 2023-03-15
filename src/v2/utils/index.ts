export * as svgCaptcha from "svg-captcha";
export { svg2png } from "svg-png-converter";
export class APIError extends Error {
    constructor(public status: number, public message: string){
        super(message)
    }
}