import 'iron-session';
import express from "express";
import { SiweMessage } from 'siwe';
import authController from "../controllers/auth";
import ironSession from '../middleware/ironSession';
import captchaRoutes from "../routes/captcha";
import v1ApiInfo from "../apiInfo";

declare module 'iron-session' {
  interface IronSessionData {
    nonce?: string;
    siwe?: SiweMessage;
    jwt?: string;
    captcha?: string;
  }
}

const router = express.Router();

/**
 * @openapi
 * /auth/nonce:
 *  post:
 *      tags:
 *          - Authentication
 *      summary: Generate a new session nonce 
 *      description: Fetch a new nonce
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
 *                          address:
 *                              type: string
 *                              required: true
 *      responses:
 *          '200':
 *              description: Successful request
 *              schema:
 *                  type: object
 *                  properties:
 *                      nonce:
 *                          type: string
 *          '500':
 *              description: Server error
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 */
router.post("/nonce", authController.nonce);

/**
 * @openapi
 * /auth/login:
 *  post:
 *      tags:
 *          - Authentication
 *      summary: Log in with SIWE
 *      description: Log in with SIWE
 *      consumes:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: siwe
 *            description: Provide SIWE login payload and signature
 *            schema:
 *              type: text
 *              required:
 *                  - payload
 *                  - signature
 *              properties:
 *                  payload:
 *                      type: string
 *                  signature:
 *                      type: string
 *      produces:
 *          -application/json
 *      responses:
 *          '200':
 *              description: Successful request
 *              schema:
 *                  type: object
 *                  properties:
 *                      success:
 *                          type: boolean
 *          '422':
 *              description: Invalid nonce
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *          '500':
 *              description: Server error
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 */
router.post("/login", authController.login);

/**
 * @openapi
 * /auth/logout:
 *  get:
 *      tags:
 *          - Authentication
 *      summary: Logout (destroy session)
 *      description: Log out
 *      produces:
 *          -application/json
 *      responses:
 *          '200':
 *              description: Successful request
 *              schema:
 *                  type: object
 *                  properties:
 *                      success:
 *                          type: boolean
 */
router.get("/logout", authController.logout);

/**
 * @openapi
 * /auth/profile:
 *  get:
 *      tags:
 *          - Authentication
 *      summary: Fetch your session information 
 *      description: Get information about current user
 *      produces:
 *          -application/json
 *      responses:
 *          '200':
 *              description: Successful request
 */
router.get("/profile", authController.profile);



/**
 * @openapi
 * /auth/siwe-payload:
 *  post:
 *      tags:
 *          - Authentication
 *      summary: Fetch a SIWE Payload
 *      description: Fetch a SIWE Payload
 *      requestBody:
 *          description: Description for request body
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nonce:
 *                              type: string
 *                              required: true
 *                          address:
 *                              type: string
 *                              required: true
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
 router.post("/siwe-payload", authController.getSiweMessage);


/**
 * Render a Login form for users to SIWE
 */

router.get('/', ironSession, (req, res) => {
  const { info: { contact: { name: author }} } = v1ApiInfo.docs as any;
  res.render('login', { 
      title: 'Sign in with Ethereum', 
      session: req.session,
      author,
  })
})

/**
 * Captcha routes
 */

router.use(`/captcha`, captchaRoutes)


export default router;