import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { Application } from '../schemas/application.schema';
// import { CreateApplicationDto } from './application.dto';
import { UserModule } from 'src/user/user.module';
import { ApplicationModule } from './application.module';
import { JwtService } from '@nestjs/jwt';
import { S3Service } from 'src/auth/aws.service';
import { CreateApplicationDto } from './application.dto';

describe('ApplicationController', () => {
  let controller: ApplicationController;
  let service: ApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationController],
      providers: [
        {
          provide: ApplicationService,
          useValue: {
            create: jest.fn().mockResolvedValue(new Application()),
            findAll: jest.fn().mockResolvedValue([new Application()]),
            findAllFromUser: jest.fn().mockResolvedValue([new Application()]),
            update: jest.fn().mockResolvedValue(new Application()),
            delete: jest.fn().mockResolvedValue(new Application()),
            countUnappliedJobsByUser: jest.fn().mockResolvedValue(1),
            autofill: jest.fn().mockResolvedValue('Success'),
          },
        },
        {
          provide: UserModule,
          useValue: {
            findOneUserById: jest.fn().mockResolvedValue({}),
            findUser: jest.fn().mockResolvedValue({}),
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

    controller = module.get<ApplicationController>(ApplicationController);
    service = module.get<ApplicationService>(ApplicationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should create an application', async () => {
      const dto = { jid: '123', status: 'pending', notes: 'note' };
      const req = { user: { id: '1' } };
      const createApplicationDto: CreateApplicationDto = {
        ...dto,
        uid: req.user.id,
        appliedDate: new Date(),
      };
      await expect(
        controller.create(req, createApplicationDto),
      ).resolves.toBeInstanceOf(Application);
      expect(service.create).toHaveBeenCalledWith(createApplicationDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of applications', async () => {
      await expect(controller.findAll()).resolves.toBeInstanceOf(Array);
    });
  });

  describe('findOne()', () => {
    it('should return applications of a user', async () => {
      const req = { user: { id: '1' } };
      const page = 1;
      const pageSize = 10;
      const status = 'pending';
      await expect(
        controller.findOne(req, page, pageSize, status),
      ).resolves.toBeInstanceOf(Array);
      expect(service.findAllFromUser).toHaveBeenCalledWith(
        '1',
        page,
        pageSize,
        status,
      );
    });
  });

  describe('update()', () => {
    it('should update an application', async () => {
      const dto = { status: 'approved', notes: 'updated note' };
      const id = '123';
      await expect(controller.update(id, dto)).resolves.toBeInstanceOf(
        Application,
      );
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('delete()', () => {
    it('should delete an application', async () => {
      const id = '123';
      await expect(controller.delete(id)).resolves.toBeInstanceOf(Application);
      expect(service.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('getUnappliedJobCount()', () => {
    it('should return the count of unapplied jobs for a user', async () => {
      const req = { user: { id: '1' } };
      await expect(controller.getUnappliedJobCount(req)).resolves.toEqual(1);
    });
  });

  describe('autofill()', () => {
    it('should return a success message', async () => {
      const req = { user: { id: '1' } };
      const body = { question: 'How to fill?' };
      await expect(controller.autofill(body, req)).resolves.toEqual('Success');
    });
  });
});
