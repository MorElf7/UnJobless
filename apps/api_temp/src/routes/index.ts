import express from "express";
const router = express.Router();
import jobsAPI from "./jobs.api";

router.use("/jobs", jobsAPI);

export default router;