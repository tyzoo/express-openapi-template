import express from "express";
import testsController from "../controllers/tests";

const router = express.Router();

/**
 * @openapi
 * /tests/rate-limit:
 *  get:
 *      tags:
 *          - Tests
 *      summary: Rate limited route. 1 request per 10 seoncds
 *      description: Rate limited route. 1 request per 10 seoncds
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
router.get("/rate-limit", testsController.rateLimit);

/**
 * @openapi
 * /tests/add-items:
 *  get:
 *      tags:
 *          - Tests
 *      summary: Create 10 test Documents
 *      description: Add 10 test documents to database
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
router.get("/add-items", testsController.addItems);

export default router;