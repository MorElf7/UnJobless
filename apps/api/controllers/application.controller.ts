import { Request, Response } from "express";
import { ApplicationService } from "../services/application.service";
import HttpException from "../utils/HttpException";
import { QueriesRequest } from "../interfaces/IRequest";

export class ApplicationController {
  static getApplicationById = async (req: Request, res: Response) => {
    try {
      const { user } = res.locals;
      const { appId } = req.params;
      res.json(await ApplicationService.getApplicationById(user, appId));
    } catch (err: any) {
      throw new HttpException(
        err?.response?.data?.status || err?.status || 500,
        err?.response?.data?.message || err?.message,
      );
    }
  };
  static getApplications = async (req: Request, res: Response) => {
    try {
      const { user } = res.locals;
      const query = req.query as unknown as QueriesRequest;
      res.json(await ApplicationService.getApplications(user, query));
    } catch (err: any) {
      throw new HttpException(
        err?.response?.data?.status || err?.status || 500,
        err?.response?.data?.message || err?.message,
      );
    }
  };
  static saveApplication = async (req: Request, res: Response) => {
    try {
      const { user } = res.locals;
      const payload = req.body;
      res.json(await ApplicationService.saveApplication(user, payload));
    } catch (err: any) {
      throw new HttpException(
        err?.response?.data?.status || err?.status || 500,
        err?.response?.data?.message || err?.message,
      );
    }
  };
}
