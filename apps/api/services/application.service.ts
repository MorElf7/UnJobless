import { QueriesRequest, SaveApplicationRequest } from "../interfaces/IRequest";
import { HydratedDocument, Types } from "mongoose";
import { DataResponse, PageResponse } from "../interfaces/IResponse";
import { IUser } from "../interfaces/IUser";
import { User } from "../models/User";
import { Application } from "../models/Application";
import { IApplication } from "../interfaces/IApplication";
import HttpException from "../utils/HttpException";
import { checkUser, checkApplicationBelongsUser } from "../utils/checkUtility";

export class ApplicationService {
  static async getApplicationById(
    currentUser: IUser,
    appId: string | Types.ObjectId,
  ): Promise<DataResponse<IApplication>> {
    const application = await checkApplicationBelongsUser(
      appId,
      currentUser.id,
    );
    return { data: application.toJSON() };
  }

  static async getApplications(
    currentUser: IUser,
    queries: QueriesRequest,
  ): Promise<PageResponse<IApplication>> {
    const page = parseInt(queries.page || "0"),
      pageSize = parseInt(queries.pageSize || "10");
    const { textSearch } = queries;
    const where: any = {
      userId: currentUser.id,
    };
    if (textSearch) {
      where.$text = {
        $search: textSearch,
      };
    }
    const applications = await Application.find(where, null, {
      limit: pageSize,
      skip: page * pageSize,
      sort: { createdAt: -1 },
    });
    const totalElements = await Application.countDocuments(where);
    return {
      data: applications.map((e) => e.toJSON()),
      totalPages: Math.ceil(totalElements / pageSize),
      totalElements,
      hasNext: Math.ceil(totalElements / pageSize) - page > 1,
    };
  }

  static async saveApplication(
    currentUser: IUser,
    payload: SaveApplicationRequest,
  ): Promise<DataResponse<IApplication>> {
    const {
      id,
      title,
      company,
      location,
      level,
      jobPostUrl,
      description,
      datePosted,
      status,
      createdAt,
      userId,
    } = payload;
    if (!currentUser.id.equals(userId)) {
      throw new HttpException(401, "Not authorized");
    }
    let savedApplication: HydratedDocument<IApplication>;
    if (id) {
      const application = await checkApplicationBelongsUser(id, userId);
      application.title = title || application.title;
      application.company = company || application.company;
      application.location = location || application.location;
      application.level = level || application.level;
      application.jobPostUrl = jobPostUrl || application.jobPostUrl;
      application.description = description || application.description;
      application.datePosted = datePosted || application.datePosted;
      application.status = status || application.status;
      application.createdAt = createdAt || application.createdAt;

      savedApplication = await application.save();
    } else {
      savedApplication = await Application.create({
        title,
        company,
        location,
        level,
        jobPostUrl,
        description,
        datePosted,
        status,
        createdAt,
        userId,
      });
    }

    return { data: savedApplication.toJSON() };
  }
}
