import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpCode } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ActiveUser } from '../iam/authentication/decorators/active-user.decorator'
import { ActiveUserData } from '../iam/authentication/interfaces/active-user-data.interface'
import { TransactionService } from 'payment/transaction.service'
import { CreditBalanceResponseDto } from './dto/credit-balance-response.dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // TODO add role guard
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  // TODO add role guard
  @Get()
  findAll(@ActiveUser() user) {
    return this.userService.findAll()
  }

  // TODO add role guard
  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: ActiveUserData) {
    return this.userService.findOne(id)
  }

  // TODO add role guard
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  // TODO add role guard
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
