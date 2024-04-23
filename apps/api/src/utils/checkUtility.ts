import { User } from "../models/User";
import { HydratedDocument, Types } from "mongoose";
import HttpException from "./HttpException";
import { Application } from "../models/Application";
import { IUser } from "../interfaces/IUser";
import { IApplication } from "../interfaces/IApplication";

export const checkUser = async (
  userInfo: any,
): Promise<HydratedDocument<IUser>> => {
  const user = await User.findOne(userInfo);
  if (!user) {
    throw new HttpException(404, `User not found`);
  }
  return user;
};

export const checkApplicationBelongsUser = async (
  appId: string | Types.ObjectId | undefined,
  userId: string | Types.ObjectId | undefined,
): Promise<HydratedDocument<IApplication>> => {
  const application = await Application.findOne({ _id: appId, userId });
  if (!application) {
    throw new HttpException(404, "Application not found");
  }
  return application;
};
