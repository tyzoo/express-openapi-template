import express from "express";

import indexRouter from "./routes/index";
import crudRouter from "./routes/crud";
import testsRouter from "./routes/tests";

const router = express.Router();

router.use("/tests", testsRouter);
router.use("/crud", crudRouter);
router.get("/", indexRouter);

export default router;