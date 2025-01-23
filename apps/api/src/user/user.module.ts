import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UserEntity, UserSchema } from './entities/user.entity'
import { MeController } from './me.controller'

@Module({
  imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }])],
  // Register MeController first to avoid routing conflicts with UsersController :id param
  controllers: [MeController, UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
