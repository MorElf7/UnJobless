import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { Application, ApplicationSchema } from '../schemas/application.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { JobService } from 'src/job/job.service';
import { Job, JobSchema } from 'src/schemas/job.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService, JobService],
  exports: [ApplicationService],
})
export class ApplicationModule {}
