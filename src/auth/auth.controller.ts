import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
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
import { CreateUserDto } from 'src/user/user.dto';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED) // Use CREATED status code for successful registration
  @Public()
  @Post('sign-up')
  @ApiConsumes('application/json')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered and JWT token returned',
  })
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
        resumeUrl: { type: 'string' },
        resumeFileName: { type: 'string' },
        coverLetterUrl: { type: 'string' },
        coverLetterFileName: { type: 'string' },
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
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       uid: { type: 'string' },
  //       email: { type: 'string' },
  //       password: { type: 'string' },
  //       firstName: { type: 'string' },
  //       lastName: { type: 'string' },
  //       contact: { type: 'string' },
  //       resume: { type: 'string' },
  //       links: { type: 'string' },
  //       experience: {
  //         type: 'array',
  //         items: {
  //           type: 'object',
  //           properties: {
  //             title: { type: 'string' },
  //             description: { type: 'string' },
  //             startDate: { type: 'string', format: 'date' },
  //             endDate: { type: 'string', format: 'date' },
  //             location: { type: 'string' },
  //           },
  //         },
  //       },
  //       education: {
  //         type: 'array',
  //         items: {
  //           type: 'object',
  //           properties: {
  //             title: { type: 'string' },
  //             description: { type: 'string' },
  //             startDate: { type: 'string', format: 'date' },
  //             endDate: { type: 'string', format: 'date' },
  //             location: { type: 'string' },
  //           },
  //         },
  //       },
  //       skills: {
  //         type: 'array',
  //         items: { type: 'string' },
  //       },
  //       equalOpportunity: { type: 'boolean' },
  //     },
  //   },
  // })
  signUp(@Body() createUserDto: CreateUserDto) {
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
  signIn(@Body() signInDto: Record<string, string>) {
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
  async findAll(): Promise<CreateUserDto[]> {
    return this.authService.findAllUsers();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Get('profile')
  getProfile(@Request() req) {
    // return everything from this user
    const uid = req.user.id;
    return this.authService.findOneUserById(uid);
    // return req.user;
  }

  // @UseGuards(AuthGuard)
  // @ApiBearerAuth('access-token')
  // @Get('logout')
  // async logout(@Request() req) {
  //   req.logout();
  //   return 'Logged out';
  // }
}
