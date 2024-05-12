import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Public } from './constants';
import { CreateUserDto, UpdateUserDto } from 'src/user/user.dto';
import {
  FileFieldsInterceptor,
  // FileInterceptor,
} from '@nestjs/platform-express';
import { S3Service } from './aws.service';
import { User } from 'src/schemas/user.schema';

@Controller('')
export class AuthController {
  constructor(
    private readonly s3Service: S3Service,
    private authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.CREATED) // Use CREATED status code for successful registration
  @Public()
  @Post('sign-up')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered and JWT token returned',
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'resume', maxCount: 1 },
      { name: 'coverLetter', maxCount: 1 },
    ]),
  )
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        password: { type: 'string' },
        linkedin: { type: 'string' },
        website: { type: 'string' },
        github: { type: 'string' },
        street_address: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        zip_code: { type: 'string' },
        resume: { type: 'string', format: 'binary' },
        coverLetter: { type: 'string', format: 'binary' },
        education: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              school: { type: 'string' },
              major: { type: 'string' },
              degree: { type: 'string' },
              gpa: { type: 'number' },
              startDate: { type: 'string', format: 'date' },
              endDate: { type: 'string', format: 'date' },
              logo: { type: 'string' },
            },
          },
        },
        experience: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              position: { type: 'string' },
              company: { type: 'string' },
              location: { type: 'string' },
              current: { type: 'boolean' },
              description: { type: 'string' },
              startDate: { type: 'string', format: 'date' },
              endDate: { type: 'string', format: 'date' },
              logo: { type: 'string' },
            },
          },
        },
        sponsorship: { type: 'string' },
        legally_authorized: { type: 'string' },
        gender: { type: 'string' },
        race: { type: 'string' },
        veteran: { type: 'string' },
        disability: { type: 'string' },
      },
    },
  })
  async signUp(@UploadedFiles() files, @Body() createUserDto: CreateUserDto) {
    if (createUserDto.education) {
      //@ts-expect-error expect errors
      createUserDto.education = JSON.parse(createUserDto.education);
    } else {
      createUserDto.education = [];
    }
    if (createUserDto.experience) {
      //@ts-expect-error expect errors
      createUserDto.experience = JSON.parse(createUserDto.experience);
    } else {
      createUserDto.experience = [];
    }
    if (files.resume) {
      const resumeUrl = await this.s3Service.uploadFile(files.resume[0]);
      createUserDto.resumeUrl = resumeUrl;
      createUserDto.resumeFileName = files.resume[0].originalname;
    }
    if (files.coverLetter) {
      const coverLetterUrl = await this.s3Service.uploadFile(
        files.coverLetter[0],
      );
      createUserDto.coverLetterUrl = coverLetterUrl;
      createUserDto.coverLetterFileName = files.coverLetter[0].originalname;
    }
    return this.authService.signUp(createUserDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('sign-in')
  @ApiConsumes('application/json')
  @ApiOperation({ summary: 'User sign-in' })
  @ApiResponse({
    status: 200,
    description: 'Access token provided on successful authentication',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'securePassword123!' },
      },
    },
  })
  async signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  //get all users
  @UseGuards(AuthGuard)
  @Get('users')
  @Public()
  @ApiOperation({ summary: 'List All Users' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
  })
  async findAll(): Promise<User[]> {
    return this.authService.findAllUsers();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Get('profile')
  async getProfile(@Request() req) {
    // return everything from this user
    const uid = req.user.id;
    return this.authService.findOneUserById(uid);
    // return req.user;
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Put('profile')
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'User updated',
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'resume', maxCount: 1 },
      { name: 'coverLetter', maxCount: 1 },
    ]),
  )
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        linkedin: { type: 'string' },
        website: { type: 'string' },
        github: { type: 'string' },
        street_address: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        zip_code: { type: 'string' },
        resume: { type: 'string', format: 'binary' },
        coverLetter: { type: 'string', format: 'binary' },
        education: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              school: { type: 'string' },
              major: { type: 'string' },
              degree: { type: 'string' },
              gpa: { type: 'number' },
              startDate: { type: 'string', format: 'date' },
              endDate: { type: 'string', format: 'date' },
              logo: { type: 'string' },
            },
          },
          required: [],
        },
        experience: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              position: { type: 'string' },
              company: { type: 'string' },
              location: { type: 'string' },
              current: { type: 'boolean' },
              description: { type: 'string' },
              startDate: { type: 'string', format: 'date' },
              endDate: { type: 'string', format: 'date' },
              logo: { type: 'string' },
            },
          },
          required: [],
        },
        sponsorship: { type: 'string' },
        legally_authorized: { type: 'string' },
        gender: { type: 'string' },
        race: { type: 'string' },
        veteran: { type: 'string' },
        disability: { type: 'string' },
      },
      required: [],
    },
  })
  async updateUser(
    @Request() req,
    @UploadedFiles() files,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const uid = req.user.id;
    if (updateUserDto.education) {
      //@ts-expect-error expect errors
      updateUserDto.education = JSON.parse(updateUserDto.education);
    }
    if (updateUserDto.experience) {
      //@ts-expect-error expect errors
      updateUserDto.experience = JSON.parse(updateUserDto.experience);
    }
    if (files.resume) {
      const resumeUrl = await this.s3Service.uploadFile(files.resume[0]);
      updateUserDto.resumeUrl = resumeUrl;
      updateUserDto.resumeFileName = files.resume[0].originalname;
    }
    if (files.coverLetter) {
      const coverLetterUrl = await this.s3Service.uploadFile(
        files.coverLetter[0],
      );
      updateUserDto.coverLetterUrl = coverLetterUrl;
      updateUserDto.coverLetterFileName = files.coverLetter[0].originalname;
    }
    return this.authService.updateUser(uid, updateUserDto);
  }
}
