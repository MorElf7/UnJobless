// application.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application } from '../schemas/application.schema';
import { CreateApplicationDto, UpdateApplicationDto } from './application.dto';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from 'config/index';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class ApplicationService {
  private openai: OpenAI;
  constructor(
    @InjectModel(Application.name) private applicationModel: Model<Application>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    this.openai = new OpenAI({ apiKey: OPENAI_API_KEY }); // Replace with your OpenAI API key
  }

  // Create a new application
  async create(
    createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    const newApplication = new this.applicationModel(createApplicationDto);
    return newApplication.save();
  }

  async findAll(jid?: string): Promise<Application[]> {
    const query = jid ? { jid } : {};
    return this.applicationModel.find(query).exec();
  }

  // Retrieve a single application by UID
  async findOne(uid: string): Promise<Application> {
    return this.applicationModel.findOne({ uid }).exec();
  }

  async findUser(uid: string): Promise<User> {
    const user = await this.userModel.findById(uid, { password: 0 }).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${uid} not found`);
    }
    return user;
  }
  async autofill(question: string, profile: string): Promise<string> {
    try {
      console.log(question);
      const completion = await this.openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content:
              'You are an assistant who are given the following information about the user:' +
              profile +
              'You are asked to answer their questions from their perspective.',
          },
          {
            role: 'user',
            content:
              `What is the answer to the following question` + question + `? `,
          },
        ],
        model: 'gpt-3.5-turbo',
      });

      console.log(completion.choices[0]);
      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error fetching answer from OpenAI:', error);
      throw new Error('Failed to fetch answer from OpenAI');
    }
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
