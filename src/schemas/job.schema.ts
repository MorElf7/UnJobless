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

  @Prop({ default: '' })
  title: string;

  @Prop({ default: '' })
  company: string;

  @Prop({ default: new Date() })
  datePosted: Date;

  @Prop({ default: '' })
  link: string;

  @Prop({ default: '' })
  image: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: 'Remote' })
  address: string;

  @Prop({ default: 'Negotiable' })
  salary: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
