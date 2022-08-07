import express from "express";
//https://editor.swagger.io/# good examples
const router = express.Router();

/**
 * @openapi
 * /crud:
 *  get:
 *      tags:
 *          - crud
 *      summary: Find all items
 *      description: Returns all items
 *      produces:
 *          -application/json
 *      responses:
 *          '200':
 *              description: A successful response!
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 */
router.get("/", ((req,res,next) => {
    res.status(200).json({ message: `Here is your list of posts`});
}) as express.RequestHandler);

/**
 * @openapi
 * /crud/{itemId}:
 *  get:
 *      tags:
 *          - crud
 *      summary: Find an item by ID
 *      description: Returns a single item
 *      operationId: getItemById
 *      parameters:
 *          - name: itemId
 *            in: path
 *            description: ID of the item to return
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *      produces:
 *          -application/json
 *      responses:
 *          '200':
 *              description: A successful response!
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *  put:
 *      tags:
 *          - crud
 *      summary: Update an item by ID
 *      description: Returns a single item
 *      parameters:
 *          - name: itemId
 *            in: path
 *            description: ID of the item to update
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *      produces:
 *          -application/json
 *      responses:
 *          '200':
 *              description: A successful response!
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *  delete:
 *      tags:
 *          - crud
 *      summary: Delete an item by ID
 *      description: Returns a single item
 *      parameters:
 *          - in: path
 *            name: itemId
 *            description: ID of the item to delete
 *            required: true
 *            schema:
 *              type: integer
 *              format: int64
 *      produces:
 *          -application/json
 *      responses:
 *          '200':
 *              description: A successful response!
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 */
router.get("/:itemId", ((req,res,next) => {
    res.status(200).json({ message: `Here's your item: ${req.params.itemId}`});
}) as express.RequestHandler);

router.put("/:itemId", ((req,res,next) => {
    res.status(200).json({ message: `Updated item: ${req.params.itemId}`});
}) as express.RequestHandler);

router.delete("/:itemId", ((req,res,next) => {
    res.status(200).json({ message: `Deleted item: ${req.params.itemId}`});
}) as express.RequestHandler);

export default router;