import express from 'express';
const router = express.Router();
import { getJobs } from '../controllers/jobs.controller';

router.get("/", getJobs);

export default router;