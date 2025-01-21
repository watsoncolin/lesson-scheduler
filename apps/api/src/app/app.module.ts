import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { IamModule } from '../iam/iam.module'
import { UsersModule } from '../users/users.module'
import { StudentsModule } from '../students/students.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://admin:secret@localhost:27019/stansburyswim?authSource=admin'),
    IamModule,
    UsersModule,
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
