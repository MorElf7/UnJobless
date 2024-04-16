import { Schema, model } from "mongoose";
import {
  IUser,
  IEducation,
  IExperience,
  IUserCreds,
} from "../interfaces/IUser";
import { Application } from "./Application";

const eduSchema = new Schema<IEducation>({
  degree: { type: String, required: true },
  school: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  gpa: { type: Number },
});

const expSchema = new Schema<IExperience>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  description: { type: String },
});

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    education: [{ type: eduSchema, default: {} }],
    experience: [{ type: expSchema, default: {} }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  },
);
userSchema.virtual("id").get(function () {
  return this._id.toString();
});

userSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await UserCredential.deleteMany({
      userId: doc._id,
    });
    await Application.deleteMany({
      userId: doc._id,
    });
  }
});

userSchema.post("findOneAndUpdate", function (doc) {
  if (doc) {
    doc.updatedAt = Date.now();
  }
});

const userCredentialsSchema = new Schema<IUserCreds>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    passwordHash: { type: String },
    token: String,
  },
  { timestamps: true },
);
userCredentialsSchema.virtual("isExpired").get(function () {
  return Date.now() >= this.expiredAt.valueOf();
});

const User = model("User", userSchema);
const UserCredential = model("UserCredential", userCredentialsSchema);

export { User, UserCredential };
