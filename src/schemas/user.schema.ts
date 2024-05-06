// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { HydratedDocument } from 'mongoose';

// export type UserDocument = HydratedDocument<User>;

// @Schema()
// export class User {
//   @Prop()
//   uid: string;

//   @Prop({ required: true })
//   email: string;

//   @Prop({ required: true })
//   password: string;

//   @Prop({ required: true })
//   firstName: string;

//   @Prop({ required: true })
//   lastName: string;

//   @Prop()
//   contact: string;

//   @Prop({ required: true })
//   resume: string;

//   @Prop()
//   links: string;

//   @Prop({ required: true })
//   Experience: [
//     {
//       title: string;
//       description: string;
//       startDate: Date;
//       endDate: Date;
//       location: string;
//       logo: string;
//     },
//   ];

//   @Prop({ required: true })
//   Education: [
//     {
//       title: string;
//       description: string;
//       startDate: Date;
//       endDate: Date;
//       location: string;
//       logo: string;
//     },
//   ];

//   @Prop()
//   skills: string[];

//   @Prop()
//   equalOpportunity: boolean;

//   @Prop({ default: Date.now })
//   createdAt: Date;

//   @Prop({ default: Date.now })
//   updatedAt: Date;
// }

// export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  uid: string;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  linkedin: string;

  @Prop()
  website: string;

  @Prop()
  github: string;

  @Prop()
  street_address: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zip_code: string;

  @Prop()
  resumeUrl: string;

  @Prop()
  resumeFileName: string;

  @Prop()
  coverLetterUrl: string;

  @Prop()
  coverLetterFileName: string;

  @Prop({ type: [{ type: Object }] })
  education: Education[];

  @Prop({ type: [{ type: Object }] })
  experience: Experience[];

  @Prop()
  sponsorship: string;

  @Prop()
  legally_authorized: string;

  @Prop()
  gender: string;

  @Prop()
  race: string;

  @Prop()
  veteran: string;

  @Prop()
  disability: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

type Achievement = {
  startDate: Date;
  endDate?: Date;
};

type Education = Achievement & {
  school: string;
  major: string;
  degree: string;
  gpa: number;
};

type Experience = Achievement & {
  position: string;
  company: string;
  location: string;
  current: boolean;
  description: string;
};
