import mongoose, { Document, Model, Schema } from "mongoose";

interface IJobs extends Document {
  position: string;
  company: string;
  location: string;
  salary: number;
  appliedDate: string;
  status: string;
  url: string;
}

interface JobsModel extends Model<IJobs> {}

const jobsSchema: Schema<IJobs> = new Schema(
  {
    position: { type: String, required: true, trim: true, minlength: 3 },
    company: { type: String, required: true, trim: true, minlength: 1 },
    location: { type: String, trim: true, minlength: 2 },
    salary: { type: Number, required: true, trim: true },
    appliedDate: { type: String, trim: true },
    status: { type: String, required: true, trim: true },
    url: { type: String, trim: true },
  },
  {
    timestamps: true,
    collection: "jobs",
  }
);

const Jobs: JobsModel = mongoose.model<IJobs, JobsModel>("Jobs", jobsSchema);
export default Jobs;
