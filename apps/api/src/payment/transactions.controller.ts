import { Controller, Get, Param, Post, Body } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { ActiveUser } from 'iam/authentication/decorators/active-user.decorator'
import { ActiveUserData } from 'iam/authentication/interfaces/active-user-data.interface'
import { CreditBalanceResponseDto } from '@lesson-scheduler/shared'
import { CreateTransactionDto, Role } from '@lesson-scheduler/shared'
import { Roles } from 'iam/authentication/decorators/roles.decorator'

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('me/credit-balance')
  async getMyCreditBalance(@ActiveUser() user: ActiveUserData): Promise<CreditBalanceResponseDto> {
    const balances = await this.transactionService.readCreditBalances(user.sub)
    return {
      balances: balances.map(balance => ({
        creditType: balance.creditType,
        balance: balance.balance,
      })),
    }
  }

  @Roles(Role.Admin)
  @Get(':userId/credit-balance')
  async getCreditBalance(@Param('userId') userId: string): Promise<CreditBalanceResponseDto> {
    const balances = await this.transactionService.readCreditBalances(userId)
    return {
      balances: balances.map(balance => ({
        creditType: balance.creditType,
        balance: balance.balance,
      })),
    }
  }

  @Get('')
  async findAll() {
    const products = await this.transactionService.findAll()
    return products
  }

  @Get('me')
  async findMy(@ActiveUser() user: ActiveUserData) {
    const transactions = await this.transactionService.findByUserId(user.sub)
    return transactions
  }

  @Get(':userId')
  async findByUserId(@Param('userId') userId: string) {
    const transactions = await this.transactionService.findByUserId(userId)
    return transactions
  }

  @Roles(Role.Admin)
  @Post('')
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    const transaction = await this.transactionService.create(createTransactionDto)
    return transaction
  }
}
