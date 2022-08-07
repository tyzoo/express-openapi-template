import express from "express";

const router = express.Router();

/**
 * @openapi
 * /:
 *  get:
 *      tags:
 *          - test
 *      description: Test if the routes are working
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
router.get("/", (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    res.status(200).json({ message: `${process.env.APP_NAME} API index`});
})

export default router;