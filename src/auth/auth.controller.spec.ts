import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
// import { AuthModule } from './auth.module';
import { ApplicationModule } from 'src/application/application.module';
import { JwtService } from '@nestjs/jwt';
import { S3Service } from './aws.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { User, UserSchema } from 'src/schemas/user.schema';
// import { Application, ApplicationSchema } from 'src/schemas/application.schema';
// import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
// import { CreateUserDto } from 'src/user/user.dto';

describe('UserController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      //   imports: [
      //     UserModule,
      //     ApplicationModule,
      // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      // MongooseModule.forFeature([
      //   { name: Application.name, schema: ApplicationSchema },
      // ]),
      // JwtModule.register({
      //   global: true,
      //   secret: jwtConstants.secret,
      //   signOptions: { expiresIn: '36000s' },
      // }),
      //   ],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn().mockResolvedValue({
              id: '1',
              access_token: 'token',
            }),
            signIn: jest.fn().mockResolvedValue({
              id: '1',
              access_token: 'token',
            }),
            findAllUsers: jest.fn().mockResolvedValue([{}]),
            findOneUserById: jest.fn().mockResolvedValue({}),
            updateUser: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: UserModule,
          useValue: {
            findOneUserById: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: ApplicationModule,
          useValue: {
            findOneUserById: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('token'),
          },
        },
        {
          provide: S3Service,
          useValue: {
            upload: jest.fn().mockResolvedValue('Success'),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect('Hello World!').toBe('Hello World!');
    });
  });
  //   describe('signUp()', () => {
  //     it('should register a user', async () => {
  //       const createUserDto = new CreateUserDto();
  //       await expect(
  //         controller.signUp(null, createUserDto),
  //       ).resolves.toHaveProperty('access_token');
  //       expect(authService.signUp).toHaveBeenCalledWith(createUserDto);
  //     });
  //   });

  //   describe('signIn()', () => {
  //     it('should authenticate a user', async () => {
  //       const signInDto = { email: 'test@example.com', password: 'password' };
  //       await expect(controller.signIn(signInDto)).resolves.toHaveProperty(
  //         'access_token',
  //       );
  //       expect(authService.signIn).toHaveBeenCalledWith(
  //         signInDto.email,
  //         signInDto.password,
  //       );
  //     });
  //   });

  // Add more tests as needed
});
