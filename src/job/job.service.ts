// Job.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from '../schemas/job.schema';
// import { Cron, CronExpression } from '@nestjs/schedule';
// import axios from 'axios';
// import * as cheerio from 'cheerio';
import {
  Scraper,
  Root,
  OpenLinks,
  CollectContent,
  DownloadContent,
} from 'nodejs-web-scraper';

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

  async scrapeData(): Promise<any> {
    const pages = [];
    const getPageObject = (pageObject: any, pageAddress: any) => {
      pageObject.link = [pageAddress];
      pageObject.datePosted = [new Date()];
      pages.push(pageObject);
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

    const jobAds = new OpenLinks('.row h2 a', {
      name: 'Ad page',
      getPageObject,
    });

    const title = new CollectContent('h1 .field--name-title', {
      name: 'title',
    });
    const companyName = new CollectContent('.field__item a', {
      name: 'companyName',
    });
    const companyAddress = new CollectContent('.company-address', {
      name: 'companyAddress',
    });
    const salary = new CollectContent('.provided-salary', { name: 'salary' });
    const desc = new CollectContent('.job-description p', { name: 'desc' });
    const logo = new DownloadContent('.logo-wrapper-medium img', {
      name: 'logo',
    });

    console.log(title);
    root.addOperation(jobAds);
    jobAds.addOperation(title);
    jobAds.addOperation(companyName);
    jobAds.addOperation(companyAddress);
    jobAds.addOperation(salary);
    jobAds.addOperation(desc);
    jobAds.addOperation(logo);

    await scraper.scrape(root);
    return pages;
  }

  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)

  async findOne(uid: string): Promise<Job> {
    return this.JobModel.findOne({
      uid: uid,
    });
  }
}
