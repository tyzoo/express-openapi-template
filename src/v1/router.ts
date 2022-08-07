import express from "express";

import indexRouter from "./routes/index";
import crudRouter from "./routes/crud";

const router = express.Router();

router.use("/crud", crudRouter);
router.get("/", indexRouter);

export default router;