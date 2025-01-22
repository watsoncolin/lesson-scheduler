import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ActiveUser } from '../iam/authentication/decorators/active-user.decorator'
import { ActiveUserData } from '../iam/authentication/interfaces/active-user-data.interface'

@Controller('users/me')
export class MeController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findMe(@ActiveUser() user: ActiveUserData) {
    return this.usersService.findOne(user.sub)
  }

  @Patch()
  update(@ActiveUser() user: ActiveUserData, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update({
      ...updateUserDto,
      id: user.sub,
    })
  }

  @Delete()
  remove(@ActiveUser() user: ActiveUserData) {
    return this.usersService.remove(user.sub)
  }
}
