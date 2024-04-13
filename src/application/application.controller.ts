// user.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApplicationService } from './application.service';
import { Application } from '../schemas/application.schema';

@ApiTags('application')
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @ApiOperation({ summary: 'Create Application' })
  @ApiResponse({
    status: 201,
    description: 'The Application has been successfully created.',
  })
  async create(@Body() createUserDto: any) {
    this.applicationService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'List Application' })
  @ApiResponse({
    status: 200,
    description: 'List of Application',
    type: [Application],
  })
  async findAll(): Promise<Application[]> {
    return this.applicationService.findAll();
  }

  // Add the rest of the CRUD operations...
}
