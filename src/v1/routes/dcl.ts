import express from "express";
import dclController from "../controllers/dcl";

const router = express.Router();


/**
 * @openapi
 * /dcl/optional:
 *  get:
 *      tags:
 *          - Decentraland
 *      summary: Test of optional middleware route
 *      description: Test of optional middleware route
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
router.get("/optional", dclController.optional);

/**
 * @openapi
 * /dcl/required:
 *  get:
 *      tags:
 *          - Decentraland
 *      summary: Test of required middleware route
 *      description: Test of required middleware route
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
 *          '400':
 *              description: Bad request
 */
router.get("/required", dclController.required);

export default router;