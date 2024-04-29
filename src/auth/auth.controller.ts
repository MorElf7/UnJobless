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
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        contact: { type: 'string' },
        resume: { type: 'string' },
        links: { type: 'string' },
      },
    },
  })
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
    return req.user;
  }

  // @UseGuards(AuthGuard)
  // @ApiBearerAuth('access-token')
  // @Get('logout')
  // async logout(@Request() req) {
  //   req.logout();
  //   return 'Logged out';
  // }
}
