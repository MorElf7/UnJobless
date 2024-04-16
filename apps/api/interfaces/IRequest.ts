import { IEducation, IExperience } from "./IUser";
import { Types } from "mongoose";

export interface QueriesRequest {
  page: string;
  pageSize: string;
  textSearch: string;
}

export interface SaveUserRequest {
  id?: Types.ObjectId;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  education?: IEducation[];
  experience?: IExperience[];
}

export interface SaveApplicationRequest {
  id?: Types.ObjectId;
  title: string;
  company: string;
  location: string;
  level: string;
  jobPostUrl: string;
  description: string;
  datePosted: Date;
  status: string;
  createdAt: Date;
  userId: Types.ObjectId;
}
