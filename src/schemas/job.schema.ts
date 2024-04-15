// Path: src/schemas/application.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JobDocument = HydratedDocument<Job>;

@Schema()
export class Job {
  @Prop()
  jid: string;

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
}

export const JobSchema = SchemaFactory.createForClass(Job);
