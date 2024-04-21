import { Schema, model } from "mongoose";
import { IApplication } from "../interfaces/IApplication";

const applicationSchema = new Schema<IApplication>(
  {
    title: { type: String },
    company: { type: String },
    location: { type: String },
    level: { type: String },
    jobPostUrl: { type: String },
    description: { type: String },
    datePosted: Date,
    status: { type: String },
    createdAt: Date,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  },
);

applicationSchema.virtual("id").get(function () {
  return this._id.toString();
});

const Application = model("Application", applicationSchema);

export { Application };
