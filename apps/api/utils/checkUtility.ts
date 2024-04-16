import { User } from "../models/User";
import { Types } from "mongoose";
import HttpException from "./HttpException";
import { Application } from "../models/Application";

export const checkUser = async (userInfo: any) => {
  const user = await User.findOne(userInfo);
  if (!user) {
    throw new HttpException(404, `User not found`);
  }
  return user;
};

export const checkApplicationBelongsUser = async (
  appId: Types.ObjectId,
  userId: Types.ObjectId,
) => {
  const application = await Application.findOne({ _id: appId, userId });
  if (!application) {
    throw new HttpException(404, "Application not found");
  }
  return application;
};
