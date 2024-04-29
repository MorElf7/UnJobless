// application.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application } from '../schemas/application.schema';
import { CreateApplicationDto, UpdateApplicationDto } from './application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name) private applicationModel: Model<Application>,
  ) {}

  // Create a new application
  async create(
    createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    const newApplication = new this.applicationModel(createApplicationDto);
    return newApplication.save();
  }

  // Retrieve all applications
  async findAll(): Promise<Application[]> {
    return this.applicationModel.find().exec();
  }

  // Retrieve all applications
  // async findAppByJob(jobId?: string): Promise<Application[]> {
  //   const query = jobId ? { job: jobId } : {};
  //   return this.applicationModel.find(query).exec();
  // }

  async findAppsByJob(jid: string): Promise<Application[]> {
    const query = jid ? { jid } : {};
    return this.applicationModel.find(query).exec();
  }

  // Retrieve a single application by UID
  async findOne(uid: string): Promise<Application> {
    return this.applicationModel.findOne({ uid }).exec();
  }

  // Update an application by UID
  async update(
    uid: string,
    updateApplicationDto: UpdateApplicationDto,
  ): Promise<Application> {
    return this.applicationModel
      .findOneAndUpdate(
        { uid: uid },
        { $set: updateApplicationDto },
        { new: true }, // This option returns the modified document to the then() function, rather than the original.
      )
      .exec();
  }

  // Delete an application by UID
  async delete(uid: string): Promise<Application> {
    return this.applicationModel.findOneAndDelete({ uid: uid }).exec();
  }
}
