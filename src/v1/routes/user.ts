import express from "express";
// import testsController from "../controllers/tests";

const router = express.Router();

/**
 * @openapi
 * /users:
 *  get:
 *      security:
 *          - bearerAuth: []
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
router.get(
    "/", 
    // passport.authenticate('jwt', {session: false}),
    // testsController.addItems,
    (req, res, next) => {

        /**
        * Just using the `passport-jwt` middleware as an example here.
        * If the JWT is valid, it attaches the user from the database
        * to the request object
        */
        res.status(200).json({ 
            success: true, 
            // user: req.user, 
        });
    }
);

export default router;