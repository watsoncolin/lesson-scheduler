import { Controller, Get, Param, Post, Body } from '@nestjs/common'
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { TransactionService } from './transaction.service'
import { ActiveUser } from 'iam/authentication/decorators/active-user.decorator'
import { ActiveUserData } from 'iam/authentication/interfaces/active-user-data.interface'
import { Role } from '@lesson-scheduler/shared'
import { Roles } from 'iam/authentication/decorators/roles.decorator'
import { TransactionResponseDto } from './dto/transaction-response.dto'
import { CreditBalanceResponseDto } from './dto/credit-balance-response.dto'
import { CreateTransactionDto } from './dto/create-transaction.dto'

@ApiTags('Transactions')
@ApiBearerAuth()
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('me/credit-balance')
  @ApiResponse({ status: 200, type: CreditBalanceResponseDto })
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
  @ApiResponse({ status: 200, type: CreditBalanceResponseDto })
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
  @ApiResponse({ status: 200, type: [TransactionResponseDto] })
  async findAll(): Promise<TransactionResponseDto[]> {
    const products = await this.transactionService.findAll()
    return products
  }

  @Get('me')
  @ApiResponse({ status: 200, type: [TransactionResponseDto] })
  async findMy(@ActiveUser() user: ActiveUserData): Promise<TransactionResponseDto[]> {
    const transactions = await this.transactionService.findByUserId(user.sub)
    return transactions
  }

  @Get(':userId')
  @ApiResponse({ status: 200, type: [TransactionResponseDto] })
  async findByUserId(@Param('userId') userId: string): Promise<TransactionResponseDto[]> {
    const transactions = await this.transactionService.findByUserId(userId)
    return transactions
  }

  @Roles(Role.Admin)
  @Post('')
  @ApiResponse({ status: 201, type: TransactionResponseDto })
  async create(@Body() createTransactionDto: CreateTransactionDto): Promise<TransactionResponseDto> {
    const transaction = await this.transactionService.create(createTransactionDto)
    return transaction
  }
}
