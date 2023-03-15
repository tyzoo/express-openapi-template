import express from "express";
import { Get, Route, Request, Middlewares, Tags, Response } from "tsoa";
import { ItemModel } from "../../models/Item";
import createRateLimiter, { IRateLimitProps } from "../middleware/rateLimitter";

@Route("tests")
@Tags("Tests")

export class TestsController {

  /**
   * Check if API is online
   */
  @Get("")
  public async checkIfOnline(): Promise<{
    online: boolean;
  }> {
    return { online: true }
  }

  /**
   * Add 10 test items to DB
   */
  @Get("add-items")
  public async addItems(): Promise<{
    message: string;
  }> {
    const count = await ItemModel.countDocuments({})
    for (let i = 1 + count; i <= 10 + count; i++) {
      await ItemModel.create({
        name: `Item ${i}`,
      })
    }
    return { message: `Added 10 test items to database` }
  }

  /**
   * Test Rate Limitter
   */
  @Get("rate-limiter")
  @Middlewares(createRateLimiter({
    prefix: `rateLimitExample`,
    requestLimit: 1,
    secondsPerWindow: 10,
  }))
  @Response<IRateLimitProps>(503, "Service Unavailable", {
    ok: false,
    message: "You are being rate limited! Slow down",
    requests: 2,
    ttl: 10,
  })  
  public async rateLimiter(
    @Request() req: express.Request,
  ): Promise<IRateLimitProps> {
    return { 
      ok: true,
      message: `This request is allowed!`,
      ...req.res?.locals.rateLimit,
    }
  }

}