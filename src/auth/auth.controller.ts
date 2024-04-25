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
  @Post('signup')
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
  @Post('signin')
  @ApiConsumes('application/json')
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
