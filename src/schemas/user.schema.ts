import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
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
  logo: string;
};

type Experience = Achievement & {
  position: string;
  company: string;
  location: string;
  current: boolean;
  description: string;
  logo: string;
};
