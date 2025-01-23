import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { ActiveUser } from '../iam/authentication/decorators/active-user.decorator'
import { ActiveUserData } from '../iam/authentication/interfaces/active-user-data.interface'

@Controller('users/me')
export class MeController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findMe(@ActiveUser() user: ActiveUserData) {
    return this.userService.findOne(user.sub)
  }

  @Patch()
  update(@ActiveUser() user: ActiveUserData, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update({
      ...updateUserDto,
      id: user.sub,
    })
  }

  @Delete()
  remove(@ActiveUser() user: ActiveUserData) {
    return this.userService.remove(user.sub)
  }
}
