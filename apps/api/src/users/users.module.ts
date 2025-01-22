import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UserEntity, UserSchema } from './entities/user.entity'
import { MeController } from './me.controller'

@Module({
  imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }])],
  // Register MeController first to avoid routing conflicts with UsersController :id param
  controllers: [MeController, UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
