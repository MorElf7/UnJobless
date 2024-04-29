// job.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JobService } from './job.service';
import { Job } from '../schemas/job.schema';
import { Public } from 'src/auth/constants';

@ApiTags('jobs')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Create job' })
  @ApiResponse({
    status: 201,
    description: 'The job has been successfully created.',
  })
  @ApiBody({
    schema: {
      properties: {
        title: { type: 'string' },
        company: { type: 'string' },
        link: { type: 'string' },
        image: { type: 'string' },
        description: { type: 'string' },
        address: { type: 'string' },
        salary: { type: 'string' },
      },
    },
  })
  async create(@Body() createJobDto: any) {
    this.jobService.create(createJobDto);
  }

  @Get('scrape')
  @ApiOperation({ summary: 'List scraped jobs' })
  @Public()
  @ApiResponse({ status: 200, description: 'List of jobs', type: [Job] })
  // async findAll(): Promise<Job[]> {
  async findJobs(): Promise<any> {
    return this.jobService.scrapeData();
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'List jobs' })
  @ApiResponse({ status: 200, description: 'List of jobs', type: [Job] })
  async findAll(): Promise<Job[]> {
    return this.jobService.findAll();
  }
}
