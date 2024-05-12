import { Test, TestingModule } from '@nestjs/testing';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { Job } from '../schemas/job.schema';

describe('JobController', () => {
  let controller: JobController;
  let service: JobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobController],
      providers: [
        {
          provide: JobService,
          useValue: {
            create: jest.fn().mockResolvedValue(
              new Job(), // Remove the argument from the constructor call
            ),
            scrapeData: jest.fn().mockResolvedValue([new Job()]),
            findAll: jest.fn().mockResolvedValue([new Job()]),
          },
        },
      ],
    }).compile();

    controller = module.get<JobController>(JobController);
    service = module.get<JobService>(JobService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe.skip('create()', () => {
    it('should create a job', async () => {
      const createJobDto = {
        title: 'Developer',
        company: 'Tech Co',
        link: 'http://example.com',
        datePosted: '2021-01-01',
        image: 'http://example.com/image.jpg',
        description: 'Job description here',
        address: '123 Main St',
        salary: '100000',
      };
      await expect(controller.create(createJobDto)).resolves.toBeInstanceOf(
        Job,
      );
      expect(service.create).toHaveBeenCalledWith(createJobDto);
    });
  });

  describe('findJobs()', () => {
    it('should return an array of scraped jobs', async () => {
      await expect(controller.findJobs()).resolves.toBeInstanceOf(Array);
      expect(service.scrapeData).toHaveBeenCalled();
    });
  });

  describe('findAll()', () => {
    it('should return an array of jobs based on query', async () => {
      const query = {
        title: 'Developer',
        company: 'Tech Co',
        salary: '100000',
      };
      await expect(controller.findAll(query)).resolves.toBeInstanceOf(Array);
      expect(service.findAll).toHaveBeenCalledWith(query);
    });
  });
});
