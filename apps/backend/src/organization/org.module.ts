import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { OrganizationService } from './org.service';
import { HttpModule } from '@nestjs/axios';
import { OrganizationsController } from './org.controller';

@Module({
  imports: [HttpModule],
  controllers: [OrganizationsController],
  providers: [OrganizationService],
})
export class OrganizationModule {}
