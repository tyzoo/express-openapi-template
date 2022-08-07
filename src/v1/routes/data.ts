import express from "express";

const router = express.Router();

/**
 * @swagger
 * /:
 *  title: Header
 *  description: yo
 *  get:
 *      produces:
 *          -application/json
 *      description: Test if the routes are working
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
    res.status(200).json({ message: `Here's yo data son`});
})

export default router;