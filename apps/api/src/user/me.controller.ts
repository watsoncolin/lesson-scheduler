import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpCode } from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { ActiveUser } from '../iam/authentication/decorators/active-user.decorator'
import { ActiveUserData } from '../iam/authentication/interfaces/active-user-data.interface'
import { TransactionService } from 'payment/transaction.service'
import { CreditBalanceResponseDto } from './dto/credit-balance-response.dto'

@Controller('users/me')
export class MeController {
  constructor(
    private readonly userService: UserService,
    private readonly transactionService: TransactionService,
  ) {}

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
  @HttpCode(204)
  remove(@ActiveUser() user: ActiveUserData) {
    return this.userService.remove(user.sub)
  }

  @Get('credit-balance')
  async getCreditBalance(@ActiveUser() user: ActiveUserData): Promise<CreditBalanceResponseDto> {
    const balances = await this.transactionService.readCreditBalances(user.sub)
    return {
      balances: balances.map(balance => ({
        creditType: balance.creditType,
        balance: balance.balance,
      })),
    }
  }
}
