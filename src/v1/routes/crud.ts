import express from "express";
import itemsController from "../controllers/itemsController";
//https://editor.swagger.io/# good inspiration
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
 *              description: A successful response
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 */
router.get("/", itemsController.findAllItems);

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
 *              description: A successful response
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
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
 *              description: A successful response
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
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
 *              description: A successful response
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *          '500':
 *              description: Item does not exist
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 */
router.get("/:itemId", itemsController.findItem);
router.put("/:itemId", itemsController.updateItem);
router.delete("/:itemId", itemsController.deleteItem);

export default router;