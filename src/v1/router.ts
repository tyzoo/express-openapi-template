import express from "express";

import indexRouter from "./routes/index";
import crudRouter from "./routes/crud";
import testsRouter from "./routes/tests";
import authRouter from "./routes/auth";
import dclRouter from "./routes/dcl";

const router = express.Router();

router.use("/tests", testsRouter);
router.use("/crud", crudRouter);
router.use("/auth", authRouter);
router.use("/dcl", dclRouter);
router.get("/", indexRouter);

export default router;