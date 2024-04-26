// Job.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from '../schemas/job.schema';

@Injectable()
export class JobService {
  constructor(@InjectModel(Job.name) private JobModel: Model<Job>) {}

  async create(createJobDto: any): Promise<Job> {
    const createdJob = new this.JobModel(createJobDto);
    return createdJob.save();
  }

  async findAll(): Promise<Job[]> {
    return this.JobModel.find().exec();
  }

  async findOne(uid: string): Promise<Job> {
    return this.JobModel.findOne({
      uid: uid,
    });
  }
}
