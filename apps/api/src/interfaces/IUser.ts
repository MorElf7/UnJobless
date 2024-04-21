import { Types } from "mongoose";

export enum YesNoAns {
  YES = "Yes",
  NO = "No",
  CUSTOM = "Self-describe",
  NA = "NA", // Not available/ no answer
}

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  NONBI = "Non-binary",
  CUSTOM = "Self-describe",
  NA = "NA",
}

export enum SexOrient {
  ASEXUAL = "Asexual",
  BISEXUAL = "Bisexual",
  GAY = "Gay",
  HETEROSEXUAL = "Heterosexual",
  LESBIAN = "Lesbian",
  QUEER = "Queer",
  CUSTOM = "Self-describe",
  NA = "NA",
}

export enum Race {
  AFRICAN = "Black/African descent",
  ASIAN = "Asian",
  HISPANIC = "Hispanic, Latin, Spanish origin",
  WHITE = "White or European",
  INDIGENOUS = "Indigenous, American Indian, or Alaskan Native",
  CUSTOM = "Self-describe",
  NA = "NA",
}

export interface IEqualOp {
  gender: Gender;
  sexOrient: SexOrient;
  requiredSponsorshipUS: YesNoAns;
  legalToWorkUS: YesNoAns;
  race: Race;
  transgender: YesNoAns;
  disability: YesNoAns;
  veteran: YesNoAns;
}

export interface ILink {
  title: string;
  url: string;
}

export interface IUser {
  id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  links: ILink[];
  education: IEducation[];
  experience: IExperience[];
  equalOp: IEqualOp;
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
