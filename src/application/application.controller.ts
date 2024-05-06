// user.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApplicationService } from './application.service';
import { Application } from '../schemas/application.schema';
import { CreateApplicationDto, UpdateApplicationDto } from './application.dto';
import { Public } from 'src/auth/constants';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('applications')
@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @ApiOperation({ summary: 'Create Application' })
  @ApiBearerAuth('access-token')
  @ApiConsumes('application/json')
  @ApiResponse({
    status: 201,
    description: 'The application has been successfully created.',
    type: Application,
  })
  @UseGuards(AuthGuard)
  @ApiBody({
    schema: {
      properties: {
        jid: { type: 'string' },
        resume: { type: 'string' },
        notes: { type: 'string' },
      },
    },
  })
  async create(
    @Req() req: any,
    @Body() createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    const uid = req.user.id;
    // Remove the assignment to the 'user' property
    return this.applicationService.create({
      ...createApplicationDto,
      uid,
    });
  }

  @Get()
  @ApiOperation({ summary: 'List All Applications' })
  @Public()
  @ApiResponse({
    status: 200,
    description: 'List of applications',
    type: [Application],
  })
  @ApiQuery({
    name: 'jid',
    type: String,
    required: false,
  })
  async findAll(@Query('jid') jid?: string): Promise<Application[]> {
    return this.applicationService.findAll(jid);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get all applications of this user' })
  @ApiBearerAuth('access-token')
  @ApiConsumes('application/json')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Applications by this user',
    type: Application,
  })
  // add parameters to filter by status
  async findOne(@Req() req: any): Promise<Application> {
    const uid = req.user.id;
    return this.applicationService.findOne(uid);
  }

  @Put(':uid')
  @ApiOperation({ summary: 'Update Application' })
  @ApiBearerAuth('access-token')
  @ApiConsumes('application/json')
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
  @ApiBearerAuth('access-token')
  @ApiConsumes('application/json')
  @ApiResponse({
    status: 200,
    description: 'The application has been successfully deleted.',
  })
  async delete(@Param('uid') uid: string): Promise<Application> {
    return this.applicationService.delete(uid);
  }

  @Post('autofill')
  @ApiOperation({ summary: 'Autofill Application' })
  @ApiBearerAuth('access-token')
  @ApiConsumes('application/json')
  @ApiResponse({
    status: 200,
    description: 'The application has been successfully autofilled.',
  })
  @ApiBody({
    schema: {
      properties: {
        question: { type: 'string' },
      },
    },
  })
  async autofill(
    @Body() body: { question: string },
    @Req() req: any,
  ): Promise<string> {
    const uid = req.user.id;
    const profile = await this.applicationService.findUser(uid);
    console.log(profile);
    return this.applicationService.autofill(body.question, profile.toString());
  }
}
