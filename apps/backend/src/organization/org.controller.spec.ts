import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsController } from './org.controller';
import { OrganizationService } from './org.service';

describe('OrganizationsController', () => {
  let controller: OrganizationsController;
  let service: OrganizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationsController],
      providers: [
        {
          provide: OrganizationService,
          useValue: {
            getSchools: jest
              .fn()
              .mockResolvedValue([
                { name: 'Tech University', logo: 'https://logo.example.com' },
              ]),
            getCompanies: jest
              .fn()
              .mockResolvedValue([
                { name: 'Tech Company', logo: 'https://logo.example.com' },
              ]),
          },
        },
      ],
    }).compile();

    controller = module.get<OrganizationsController>(OrganizationsController);
    service = module.get<OrganizationService>(OrganizationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getSchools()', () => {
    it('should return an array of schools', async () => {
      const name = 'Tech';
      await expect(controller.getSchools(name)).resolves.toEqual([
        { name: 'Tech University', logo: 'https://logo.example.com' },
      ]);
      expect(service.getSchools).toHaveBeenCalledWith(name);
    });
  });

  describe('getCompanies()', () => {
    it('should return an array of companies', async () => {
      const name = 'Tech';
      await expect(controller.getCompanies(name)).resolves.toEqual([
        { name: 'Tech Company', logo: 'https://logo.example.com' },
      ]);
      expect(service.getCompanies).toHaveBeenCalledWith(name);
    });
  });
});
