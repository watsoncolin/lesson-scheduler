import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ActiveUser } from '../iam/authentication/decorators/active-user.decorator'
import { ActiveUserData } from '../iam/authentication/interfaces/active-user-data.interface'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // TODO add role guard
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  // TODO add role guard
  @Get()
  findAll(@ActiveUser() user) {
    return this.usersService.findAll()
  }

  // TODO add role guard
  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: ActiveUserData) {
    return this.usersService.findOne(id)
  }

  // TODO add role guard
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto)
  }

  // TODO add role guard
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
