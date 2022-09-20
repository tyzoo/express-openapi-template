import express from "express";

import indexRouter from "./routes/index";
import crudRouter from "./routes/crud";
import testsRouter from "./routes/tests";
import authRouter from "./routes/auth";

const router = express.Router();

router.use("/tests", testsRouter);
router.use("/crud", crudRouter);
router.use("/auth", authRouter);
router.get("/", indexRouter);

export default router;