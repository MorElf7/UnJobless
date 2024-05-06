import { Controller, Get, Param } from '@nestjs/common';
import { OrganizationService } from './org.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/constants';

@ApiTags('')
@Controller('')
export class OrganizationsController {
  constructor(private readonly service: OrganizationService) {}

  @Get('schools/:name')
  @Public()
  @ApiConsumes('application/json')
  async getSchools(@Param('name') name: string) {
    return this.service.getSchools(name);
  }

  @Get('companies/:name')
  @Public()
  @ApiConsumes('application/json')
  async getCompanies(@Param('name') name: string) {
    return this.service.getCompanies(name);
  }
}
