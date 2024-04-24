// Path: src/schemas/application.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ApplicationDocument = HydratedDocument<Application>;

export enum ApplicationStatus {
  Applied = 'applied',
  Interviewing = 'interviewing',
  Offer = 'offer',
  Rejected = 'rejected',
}

@Schema()
export class Application {
  @Prop()
  aid: string;

  @Prop()
  uid: number;

  @Prop()
  title: string;

  @Prop()
  company: string;

  @Prop({ default: Date.now })
  appliedDate: Date;

  // status: applied, interviewing, offer, rejected
  @Prop({ enum: ApplicationStatus })
  status: ApplicationStatus;

  @Prop()
  notes: string;

  @Prop()
  resume: string;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
