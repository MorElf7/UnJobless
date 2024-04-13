// Path: src/schemas/application.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ApplicationDocument = HydratedDocument<Application>;

@Schema()
export class Application {
  @Prop()
  uid: string;

  @Prop()
  aid: string;

  @Prop()
  title: string;

  @Prop()
  company: string;

  @Prop()
  appliedDate: Date;

  @Prop()
  status: string;

  @Prop()
  notes: string;

  @Prop()
  image: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
