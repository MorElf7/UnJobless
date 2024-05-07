// Path: src/schemas/application.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ApplicationDocument = HydratedDocument<Application>;

@Schema()
export class Application {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  uid: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Job' })
  jid: mongoose.Schema.Types.ObjectId;

  @Prop({ default: Date.now })
  appliedDate: Date;

  @Prop({ default: false })
  accepted: boolean;

  @Prop()
  notes: string;

  @Prop()
  resume: string;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
