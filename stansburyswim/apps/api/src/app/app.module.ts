import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  StudentEntity,
  StudentSchema,
} from '../students/entities/student.entity';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27019/stansburyswim'),
    MongooseModule.forFeature([
      // { name: 'User', schema: UserSchema },
      { name: StudentEntity.name, schema: StudentSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
