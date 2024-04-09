// user.schema.ts
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  firstName: String,
  lastName: String,
  contact: String,
  resume: String,
  links: String,
  classExperience: [
    {
      title: String,
      description: String,
      startDate: Date,
      endDate: Date,
      location: String,
    },
  ],
  classEducation: [
    {
      title: String,
      description: String,
      startDate: Date,
      endDate: Date,
      location: String,
    },
  ],
  skills: [String],
  arrays_aid: [String],
  equalOpportunity: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
