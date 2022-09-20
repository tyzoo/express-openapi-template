import 'iron-session';
import express from "express";
import { SiweMessage } from 'siwe';
import authController from "../controllers/auth";

declare module 'iron-session' {
  interface IronSessionData {
    nonce?: string
    siwe?: SiweMessage
    jwt?: string
  }
}

const router = express.Router();

/**
 * @openapi
 * /auth/nonce:
 *  get:
 *      tags:
 *          - Authentication
 *      summary: Generate a new session nonce 
 *      description: Fetch a new nonce
 *      produces:
 *          -application/json
 *      responses:
 *          '200':
 *              description: A successful response
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
router.get("/nonce", authController.nonce);

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
 *              description: A successful response
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
router.get("/login", authController.login);

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
 *              description: A successful response
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
 *              description: A successful response
 */
router.get("/profile", authController.profile);

export default router;