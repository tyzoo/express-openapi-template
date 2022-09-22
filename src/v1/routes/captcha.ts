import express from "express";
import captchaController from "../controllers/captcha";

const router = express.Router();

/**
 * @openapi
 * /auth/captcha/new:
 *  get:
 *      tags:
 *          - Authentication
 *      summary: Generate a new Captcha image
 *      description: Generate a new Captcha image
 *      produces:
 *          -application/json
 *      responses:
 *          '200':
 *              description: Successful request
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 */
router.get("/new", captchaController.new);

/**
 * @openapi
 * /auth/captcha/verify:
 *  post:
 *      tags:
 *          - Authentication
 *      summary: Verify the captcha code
 *      description: Verify the captcha code
 *      produces:
 *          -application/json
 *      requestBody:
 *          description: Description for request body
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          code:
 *                              type: string
 *                              default: 
 *                              required: true
 *      responses:
 *          '200':
 *              description: Successful request
 *              schema:
 *                  type: image
 */
router.post("/verify", captchaController.verify);

export default router;