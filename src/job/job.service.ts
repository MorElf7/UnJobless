// Job.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from '../schemas/job.schema';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import * as cheerio from 'cheerio';
import indeed from 'indeed-scraper';

@Injectable()
export class JobService {
  constructor(@InjectModel(Job.name) private JobModel: Model<Job>) {
    // this.jobsUrl =
    //   'http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=120&t.k=fz6JLNDfgVs&action=employers&q=pharmaceuticals&userip=192.168.43.42&useragent=Mozilla/%2F4.0'; // Replace with actual API URL
  }

  async create(createJobDto: any): Promise<Job> {
    const createdJob = new this.JobModel(createJobDto);
    return createdJob.save();
  }
  private extractJobs(html: string): string[] {
    const $ = cheerio.load(html);
    const jobDescriptions = [];
    $('.jobsearch-JobComponent-description').each((index, element) => {
      jobDescriptions.push($(element).text());
    });
    return jobDescriptions;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  // async findAll(): Promise<Job[]> {
  async findAll(): Promise<string[]> {
    try {
      const queryOptions = {
        host: 'www.indeed.com',
        query: 'Software',
        city: 'Seattle, WA',
        radius: '25',
        level: 'entry_level',
        jobType: 'fulltime',
        maxAge: '7',
        sort: 'date',
        limit: 100,
      };

      indeed.query(queryOptions).then((res) => {
        console.log(res); // An array of Job objects
      });
      const response = await axios.get(
        'https://www.indeed.com/jobs?q=software+engineer&l=Amherst%2C+MA&from=searchOnHP&vjk=e27ca296efe1fe04',
      );
      return this.extractJobs(response.data.response);
    } catch (error) {
      console.error('Error scraping jobs:', error);
      throw new Error('Failed to scrape jobs');
    }
    // try {
    //   const response = await axios.get(
    //     'http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=120&t.k=fz6JLNDfgVs&action=employers&q=pharmaceuticals&userip=192.168.43.42&useragent=Mozilla/%2F4.0',
    //     {
    //       params: {
    //         /* API parameters */
    //       },
    //     },
    //   );
    //   console.log(response.data.response);
    //   return response.data.response; // Adjust according to actual API response structure
    // } catch (error) {
    //   console.error('Failed to refresh jobs:', error);
    // }
    // return this.JobModel.find().exec();
  }

  async findOne(uid: string): Promise<Job> {
    return this.JobModel.findOne({
      uid: uid,
    });
  }
}
