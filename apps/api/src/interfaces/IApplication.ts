import { Types } from "mongoose";

export enum ApplicationStatus {
  Applied = "Applied",
  Rejected = "Rejected",
  Interviewed = "Interviewed",
}

export enum JobLevel {
  Internship = "Internship",
  Entry = "Entry",
  Mid = "Mid",
  Senior = "Senior",
  Associate = "Associate",
  Director = "Director",
  Executive = "Executive",
}

export interface IApplication {
  title: string;
  company: string;
  location: string;
  level: JobLevel;
  jobPostUrl: string;
  description: string;
  datePosted: Date;
  status: ApplicationStatus;
  createdAt: Date;
  userId: Types.ObjectId;
}
