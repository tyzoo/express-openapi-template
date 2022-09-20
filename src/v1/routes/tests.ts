import express from "express";
import testsController from "../controllers/tests";

const router = express.Router();

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
 *              description: A successful response
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 */
router.get("/add-items", testsController.addItems);

export default router;