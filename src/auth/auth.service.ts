import {
  Injectable,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Job, JobDocument } from 'src/schemas/job.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: AuthService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Job.name)
    private professorModel: Model<JobDocument>,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    let user;
    try {
      user = await this.findOneUser(email);
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
    // console.log(user, user.password, password)
    if (user.password !== password) {
      console.log(user.password, password);
      throw new UnauthorizedException();
    }
    const payload = {
      username: user.name,
      email: user.email,
      name: user.name,
      id: user['_id'],
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findOneUser(@Param('email') email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }
}
