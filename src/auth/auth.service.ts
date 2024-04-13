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
    let isStudent = true;
    try {
      user = await this.findOneStudent(email);
    } catch (e) {
      try {
        user = await this.findOneProf(email);
        isStudent = false;
      } catch (e) {
        console.log(e);
        throw new UnauthorizedException();
        // return JSON.stringify({
        //   success: false,
        //   message: 'Invalid username or password',
        // });
      }
    }
    // console.log(user, user.password, password)
    if (user.password !== password) {
      console.log(user.password, password);
      //   return JSON.stringify({
      //   success: false,
      //   message: 'Invalid username or password',
      // });
      throw new UnauthorizedException();
    }
    // const { password, ...result } = user;
    // Generate a JWT and return it here
    // // instead of the user object
    // return result;
    const payload = {
      username: user.name,
      email: user.email,
      name: user.name,
      id: user['_id'],
      isStudent: isStudent,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      isStudent: isStudent,
    };
  }

  async findOneStudent(@Param('email') email: string): Promise<Student> {
    const student = await this.studentModel.findOne({ email }).exec();
    if (!student) {
      throw new NotFoundException(`Student with email ${email} not found`);
    }
    return student;
  }

  async findOneProf(@Param('email') email: string): Promise<Professor> {
    const prof = await this.professorModel.findOne({ email }).exec();
    if (!prof) {
      throw new NotFoundException(`Professor with email ${email} not found`);
    }
    return prof;
  }
}
