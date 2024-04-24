import { Req } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  uid: string;

  @Prop()
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  contact: string;

  @Prop()
  resume: string;

  @Prop()
  links: string;

  @Prop()
  classExperience: [
    {
      title: string;
      description: string;
      startDate: Date;
      endDate: Date;
      location: string;
    },
  ];

  @Prop()
  classEducation: [
    {
      title: string;
      description: string;
      startDate: Date;
      endDate: Date;
      location: string;
    },
  ];

  @Prop()
  skills: string[];

  @Prop()
  arrays_aid: string[];

  @Prop()
  equalOpportunity: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
