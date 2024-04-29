import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  uid: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  contact: string;

  @Prop({ required: true })
  resume: string;

  @Prop()
  links: string;

  @Prop({ required: true })
  Experience: [
    {
      title: string;
      description: string;
      startDate: Date;
      endDate: Date;
      location: string;
    },
  ];

  @Prop({ required: true })
  Education: [
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
  equalOpportunity: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
