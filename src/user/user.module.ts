// user.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.userService.findOne(uid);
  }

  // Add other endpoints like POST for create, PUT for update, DELETE for delete
}
