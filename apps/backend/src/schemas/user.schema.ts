import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

class Achievement {
  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate?: Date;
}

@Schema()
class Education extends Achievement {
  @Prop({ required: true })
  school: string;

  @Prop({ required: true })
  major: string;

  @Prop({ required: true })
  degree: string;

  @Prop()
  gpa: number;

  @Prop()
  logo: string;
}

@Schema()
class Experience extends Achievement {
  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  company: string;

  @Prop()
  location: string;

  @Prop()
  current: boolean;

  @Prop()
  description: string;

  @Prop()
  logo: string;
}

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

  @Prop({ type: [Education], default: [] })
  education: Education[];

  @Prop({ type: [Experience], default: [] })
  experience: Experience[];

  @Prop({ default: 'No' })
  sponsorship: string;

  @Prop({ default: 'No' })
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
