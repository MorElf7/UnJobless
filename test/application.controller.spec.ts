import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { Application } from '../schemas/application.schema';
import { Types } from 'mongoose';
// import { CreateApplicationDto } from './application.dto';

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
            create: jest.fn(),
            findAll: jest.fn(),
            findAllFromUser: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            countUnappliedJobsByUser: jest.fn(),
            autofill: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ApplicationController>(ApplicationController);
    service = module.get<ApplicationService>(ApplicationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //   describe.skip('create()', () => {
  //     const appliedDate = new Date();
  //     const updatedAt = new Date();

  //     it('should create a new application', async () => {
  //       const dto: any = {
  //         jid: '662fae9150e9fe1e7ccbe5bd',
  //         status: 'applied',
  //         notes: 'string',
  //       };
  //       const result = {
  //         uid: '663bf94075e07361cf3092f5',
  //         jid: '662fae9150e9fe1e7ccbe5bd',
  //         status: 'applied',
  //         notes: 'string',
  //         _id: '663e5c74347fe558b6073878',
  //         appliedDate,
  //         updatedAt,
  //         __v: 0,
  //       };
  //       jest.spyOn(service, 'create').mockImplementation(async () => result);

  //       expect(
  //         await controller.create(
  //           { user: { id: '663bf94075e07361cf3092f51' } },
  //           dto,
  //         ),
  //       ).toBe(result);
  //     });
  //   });

  //   //skip this
  //   describe('findAll()', () => {
  //     it('should return an array of applications', async () => {
  //       const result: Application[] = [];
  //       jest.spyOn(service, 'findAll').mockImplementation(async () => result);

  //       expect(await controller.findAll()).toBe(result);
  //     });
  //   });

  //   describe('findOne()', () => {
  //     it('should return applications for a specific user', async () => {
  //       const result: Application[] = [];
  //       jest
  //         .spyOn(service, 'findAllFromUser')
  //         .mockImplementation(async () => result);

  //       expect(
  //         await controller.findOne({ user: { id: '1' } }, 'applied', 1, 10),
  //       ).toBe(result);
  //     });
  //   });

  //   describe.skip('update()', () => {
  //     it('should update an application', async () => {
  //       const uid = '1' as unknown as Types.ObjectId;
  //       const dto = { status: 'approved' };
  //       const result: Application = {
  //         uid,
  //         jid: '123',
  //         status: 'approved',
  //         notes: 'Updated',
  //       };
  //       jest.spyOn(service, 'update').mockImplementation(async () => result);

  //       expect(await controller.update(uid, dto)).toBe(result);
  //     });
  //   });

  //   describe.skip('getUnappliedJobCount()', () => {
  //     it('should return the count of unapplied jobs', async () => {
  //       const count = 5;
  //       jest
  //         .spyOn(service, 'countUnappliedJobsByUser')
  //         .mockImplementation(async () => count);

  //       expect(await controller.getUnappliedJobCount({ user: { id: '1' } })).toBe(
  //         count,
  //       );
  //     });
  //   });

  //   describe.skip('autofill()', () => {
  //     it('should autofill an application', async () => {
  //       const body = { question: 'Fill this' };
  //       const result = 'Filled';
  //       jest.spyOn(service, 'autofill').mockImplementation(async () => result);

  //       expect(await controller.autofill(body, { user: { id: '1' } })).toBe(
  //         result,
  //       );
  //     });
  //   });
});
