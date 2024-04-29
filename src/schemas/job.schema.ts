// Path: src/schemas/application.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Application } from './application.schema';

export type JobDocument = HydratedDocument<Job>;

@Schema()
export class Job {
  @Prop()
  id: mongoose.Schema.Types.ObjectId;

  @Prop()
  applications: Application[];

  @Prop()
  title: string;

  @Prop()
  company: string;

  @Prop()
  datePosted: Date;

  @Prop()
  link: string;

  @Prop()
  image: string;

  @Prop()
  description: string;

  @Prop()
  address: string;

  @Prop()
  salary: string;

  @Prop()
  logo: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
