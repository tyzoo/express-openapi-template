import express from "express";
import { Get, Route, Request, Middlewares, Tags, Body, Post, Response } from "tsoa";
import ironSession from "../../middleware/ironSession";
import { APIError, svg2png, svgCaptcha } from "../../utils";


@Route("captcha")
@Tags("Authentication")
@Response<{ message: string; }>(401, "Unauthorized", { message: `Unauthorized request` })

export class CaptchaController {

  /**
   * Get a nonce for a user
   */
  @Get("new")
  @Middlewares(ironSession)
  public async newCaptcha(
    @Request() req: express.Request,
  ): Promise<null> {
    const res = req.res;
    const captcha = svgCaptcha.create({
        size: 6,
        noise: 6,
        width: 300,
        height: 100,
        ignoreChars: '0o1iIlO',
    });
    const png = await svg2png({ 
        input: captcha.data.trim(), 
        encoding: 'dataURL', 
        format: 'png',
    })
    req.session.captcha = captcha.text;
    await req.session.save();
    const img = Buffer.from(
        png.replace(/^data:image\/png;base64,/, ''), 
        'base64'
    );

    res!.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
    });
    res!.end(img); 
    return null;
  }

  /**
   * Get a SIWE Payload for an address/nonce
   */
  @Post("verify")
  @Middlewares(ironSession)
  public async getSiweMessage(
    @Body() body: {
      code: string;
    },
    @Request() req: express.Request,
  ): Promise<{ success: boolean; }> {
    const { code } = body;
    const sessionCode = req.session.captcha
    if(!code && sessionCode && code === sessionCode){
        throw new APIError(403, `Invalid code`)
    }
    return { success: true }
  }    
}