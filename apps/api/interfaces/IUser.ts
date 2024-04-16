import { Types } from "mongoose";

export interface IUser {
  id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  education: IEducation[];
  experience: IExperience[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IEducation {
  degree: string;
  school: string;
  startDate: Date;
  endDate: Date;
  gpa: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IExperience {
  title: string;
  company: string;
  startDate: Date;
  endDate: Date;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreds {
  userId: Types.ObjectId;
  passwordHash: string;
  token: string;
  expiredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
