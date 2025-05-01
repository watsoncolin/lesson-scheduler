import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UserEntity, UserSchema } from './entities/user.entity'
import { MeController } from './me.controller'
import { StudentModule } from '../student/student.module'
import { CqrsModule } from '@nestjs/cqrs'
@Module({
  imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]), StudentModule, CqrsModule],
  // Register MeController first to avoid routing conflicts with UsersController :id param
  controllers: [MeController, UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
