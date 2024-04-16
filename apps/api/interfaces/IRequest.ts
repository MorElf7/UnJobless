import { IEducation, IExperience } from "./IUser";
import { Types } from "mongoose";
import { ApplicationStatus, JobLevel } from "./IApplication";

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
  title?: string;
  company?: string;
  location?: string;
  level?: JobLevel;
  jobPostUrl?: string;
  description?: string;
  datePosted?: Date;
  status?: ApplicationStatus;
  createdAt?: Date;
  userId?: Types.ObjectId;
}
