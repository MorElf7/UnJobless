import { Request, Response, NextFunction } from "express";
import { sendResponse, AppError, catchAsync } from "../helpers/utils";
import Jobs from "../models/jobs";

export const getJobs = catchAsync(async (req: any, res: Response, next: NextFunction) => {
    let { page, limit } = req.query;

    const count = await Jobs.countDocuments({});
    const totalPages = Math.ceil(count / limit);
    const offset = (page - 1) * limit;

    let jobs = await Jobs.find({}).skip(offset).limit(limit);

    sendResponse(res, 200, true, { jobs, totalPages, count }, null, null);
  });