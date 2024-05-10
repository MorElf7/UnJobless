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
        status: { type: 'string' },
        // resume: { type: 'string' },
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
  @ApiQuery({
    name: 'status',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number of the results',
  })
  @ApiQuery({
    name: 'page_size',
    type: Number,
    required: false,
    description: 'Number of results per page',
  })

  // add parameters to filter by status
  // Add page_size in applications
  async findOne(
    @Req() req: any,
    @Query('status') status: string = 'applied',
    @Query('page') page: number = 1,
    @Query('page_size') pageSize: number = 10,
  ): Promise<Application[]> {
    const uid = req.user.id;
    return this.applicationService.findAllFromUser(uid, status, page, pageSize);
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
  @ApiBody({
    schema: {
      properties: {
        status: { type: 'string' },
        // resume: { type: 'string' },
        notes: { type: 'string' },
      },
    },
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

  // ApplicationController.ts
  @Get('unapplied')
  @ApiOperation({ summary: 'Get count of unapplied jobs by this user' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Number of unapplied jobs',
    type: Number,
  })
  async getUnappliedJobCount(@Req() req: any): Promise<number> {
    const uid = req.user.id;
    return this.applicationService.countUnappliedJobsByUser(uid);
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
