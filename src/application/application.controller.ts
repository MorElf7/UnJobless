// user.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApplicationService } from './application.service';
import { Application } from '../schemas/application.schema';
import { CreateApplicationDto, UpdateApplicationDto } from './application.dto';

@ApiTags('application')
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @ApiOperation({ summary: 'Create Application' })
  @ApiResponse({
    status: 201,
    description: 'The application has been successfully created.',
    type: Application,
  })
  @ApiBody({
    schema: {
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        status: { type: 'string' },
      },
    },
  })
  async create(
    @Body() createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    return this.applicationService.create(createApplicationDto);
  }

  @Get()
  @ApiOperation({ summary: 'List All Applications' })
  @ApiResponse({
    status: 200,
    description: 'List of applications',
    type: [Application],
  })
  async findAll(): Promise<Application[]> {
    return this.applicationService.findAll();
  }

  @Get(':uid')
  @ApiOperation({ summary: 'Get Application by UID' })
  @ApiResponse({
    status: 200,
    description: 'The application details',
    type: Application,
  })
  @ApiBody({
    schema: {
      properties: {
        uid: { type: 'string' },
      },
    },
  })
  async findOne(@Param('uid') uid: string): Promise<Application> {
    return this.applicationService.findOne(uid);
  }

  @Put(':uid')
  @ApiOperation({ summary: 'Update Application' })
  @ApiResponse({
    status: 200,
    description: 'The application has been successfully updated.',
    type: Application,
  })
  async update(
    @Param('uid') uid: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ): Promise<Application> {
    return this.applicationService.update(uid, updateApplicationDto);
  }

  @Delete(':uid')
  @ApiOperation({ summary: 'Delete Application' })
  @ApiResponse({
    status: 200,
    description: 'The application has been successfully deleted.',
  })
  async delete(@Param('uid') uid: string): Promise<Application> {
    return this.applicationService.delete(uid);
  }
}
