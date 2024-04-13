// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application } from '../schemas/application.schema';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name) private applicationModel: Model<Application>,
  ) {}

  async create(createUserDto: any): Promise<Application> {
    const createdUser = new this.applicationModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<Application[]> {
    return this.applicationModel.find().exec();
  }

  async findOne(uid: string): Promise<Application> {
    return this.applicationModel.findOne({
      uid: uid,
    });
  }
}
