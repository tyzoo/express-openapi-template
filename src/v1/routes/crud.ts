import express from "express";
import crudController from "../controllers/crud";

/**
 * This file provides an example set of CRUD routes
 * 
 * https://editor.swagger.io/# - Openapi annotation inspiration
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses
 */

const router = express.Router();

/**
 * @openapi
 * /crud:
 *  get:
 *      tags:
 *          - CRUD
 *      summary: Find all items
 *      description: Returns all items
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
 router.get("/", crudController.findAllItems);

/**
 * @openapi
 * /crud:
 *  post:
 *      tags:
 *          - CRUD
 *      summary: Create an Item
 *      description: Create an Item
 *      requestBody:
 *          description: Description for request body
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              default: Item
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
 *          '400':
 *              description: Bad request - Validation failed
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 */
router.post("/", crudController.createItem);

/**
 * @openapi
 * /crud/{itemId}:
 *  get:
 *      tags:
 *          - CRUD
 *      summary: Find an item by ID
 *      description: Returns a single item
 *      operationId: getItemById
 *      parameters:
 *          - in: path
 *            name: itemId
 *            description: ID of the item to return
 *            required: true
 *            schema:
 *              type: string
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
 *              description: Bad request - Validation failed
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 */
router.get("/:itemId", crudController.findItem);

/**
 * @openapi
 * /crud/{itemId}:
 *  put:
 *      tags:
 *          - CRUD
 *      summary: Update an item by ID
 *      description: Returns a single item
 *      requestBody:
 *          description: Description for request body
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              default: Item
 *                              required: true
 *                          rng:
 *                              type: number
 *                              required: false
 *      parameters:
 *          - in: path
 *            name: itemId
 *            description: ID of the item to update
 *            required: true
 *            schema:
 *              type: string
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
 *              description: Bad request - Validation failed
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *          '500':
 *              description: Server Error - Item does not exist
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 */
router.put("/:itemId", crudController.updateItem);

/**
 * @openapi
 * /crud/{itemId}:
 *  delete:
 *      tags:
 *          - CRUD
 *      summary: Delete an item by ID
 *      description: Returns a single item
 *      parameters:
 *          - in: path
 *            name: itemId
 *            description: ID of the item to delete
 *            required: true
 *            schema:
 *              type: string
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
 *              description: Bad request - Validation failed
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *          '500':
 *              description: Server Error - Item does not exist
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 */
router.delete("/:itemId", crudController.deleteItem);

export default router;