import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { MONGO_SECRET } from 'config/index';

@Module({
  imports: [UserModule, MongooseModule.forRoot(MONGO_SECRET)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
