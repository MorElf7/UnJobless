// job.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JobService } from './job.service';
import { Job } from '../schemas/job.schema';
import { Public } from 'src/auth/constants';

@ApiTags('jobs')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @ApiOperation({ summary: 'Create job' })
  @ApiResponse({
    status: 201,
    description: 'The job has been successfully created.',
  })
  async create(@Body() createJobDto: any) {
    this.jobService.create(createJobDto);
  }

  @Get()
  @ApiOperation({ summary: 'List jobs' })
  @Public()
  @ApiResponse({ status: 200, description: 'List of jobs', type: [Job] })
  // async findAll(): Promise<Job[]> {
  async findAll(): Promise<string[]> {
    return this.jobService.findAll();
  }
  // Add the rest of the CRUD operations...
}
