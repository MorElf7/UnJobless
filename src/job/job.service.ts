// Job.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from '../schemas/job.schema';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  Scraper,
  Root,
  OpenLinks,
  CollectContent,
  DownloadContent,
} from 'nodejs-web-scraper';
import * as fs from 'fs-extra';
import { CreateJobDto } from './job.dto';

@Injectable()
export class JobService {
  constructor(@InjectModel(Job.name) private JobModel: Model<Job>) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const createdJob = new this.JobModel(createJobDto);
    return createdJob.save();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async scrapeData(): Promise<any> {
    const pages = [];
    const getPageObject = (pageObject: any, pageAddress: any) => {
      pageObject.link = pageAddress;
      pageObject.datePosted = new Date();
      pages.push(pageObject);
      // convert the pageObject to a Job object before saving
      const job = {
        title: pageObject.title[0] || '',
        company: pageObject.company[0] || '',
        link: pageAddress || '',
        image: pageObject.logo[0] || '',
        description: pageObject.description[0] || '',
        address: pageObject.address[0] || '',
        salary: pageObject.salary[0] || '',
      };
      const createdJob = new this.JobModel(job);
      createdJob.save();
    };

    const config = {
      baseSiteUrl: `https://builtin.com/`,
      startUrl: `https://builtin.com/jobs`, //`https://www.profesia.sk/praca/`, search?q=software+engineer&l=Amherst%2C+MA
      filePath: './images/',
      logPath: './logs/',
    };

    const scraper = new Scraper(config);

    const root = new Root({
      pagination: {
        queryString: 'page',
        begin: 1,
        end: 3,
      },
      getPageHtml: (htmlString, pageAddress) => {
        console.log(pageAddress);
      },
    });

    const links = new OpenLinks('.row h2 a', {
      name: 'link',
      getPageObject,
    });

    const title = new CollectContent('h1 .field--name-title', {
      name: 'title',
    });
    const company = new CollectContent('.field__item a', {
      name: 'company',
    });
    const address = new CollectContent('.company-address', {
      name: 'address',
    });
    const salary = new CollectContent('.provided-salary', { name: 'salary' });
    const description = new CollectContent('.job-description p', {
      name: 'description',
    });
    const logo = new DownloadContent('.logo-wrapper-medium img', {
      name: 'logo',
    });

    console.log(title);
    root.addOperation(links);
    links.addOperation(title);
    links.addOperation(company);
    links.addOperation(address);
    links.addOperation(salary);
    links.addOperation(description);
    links.addOperation(logo);

    await scraper.scrape(root);
    await fs.remove('./images');
    return pages;
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
