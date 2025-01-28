import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { TransactionEntity } from './entities/transaction.entity'
import { Transaction } from './transaction'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { CreditBalanceDto } from './dto/credit-balance.dto'
import { CreditTypesEnum } from 'shared/credit-types.enum'

const mapper = (entity: TransactionEntity): Transaction => {
  return {
    id: entity._id.toString(),
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
    userId: entity.userId.toString(),
    productId: entity.productId ? entity.productId.toString() : undefined,
    scheduleId: entity.scheduleId ? entity.scheduleId.toString() : undefined,
    amount: entity.amount,
    credits: entity.credits,
    creditType: entity.creditType,
    transactionType: entity.transactionType,
  }
}

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(TransactionEntity.name)
    private readonly model: Model<TransactionEntity>,
  ) {}
  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const _id = new ObjectId()
    const result = await this.model.create({
      _id,
      userId: new ObjectId(createTransactionDto.userId),
      productId: createTransactionDto.productId ? new ObjectId(createTransactionDto.productId) : undefined,
      scheduleId: createTransactionDto.scheduleId ? new ObjectId(createTransactionDto.scheduleId) : undefined,
      amount: createTransactionDto.amount,
      credits: createTransactionDto.credits,
      creditType: createTransactionDto.creditType,
      transactionType: createTransactionDto.transactionType,
      paymentId: createTransactionDto.paymentId ? new ObjectId(createTransactionDto.paymentId) : undefined,
    })
    const entity = await this.model.findById(result._id)
    if (!entity) {
      throw new Error('Transaction not found')
    }
    const transaction = mapper(entity)
    return transaction
  }

  async findAll(): Promise<Transaction[]> {
    return (await this.model.find()).map(mapper)
  }

  async findOne(id: string): Promise<Transaction> {
    const entity = await this.model.findById(new ObjectId(id))
    if (!entity) {
      throw new Error('Transaction not found')
    }
    return mapper(entity)
  }

  async readCreditBalances(userId: string): Promise<CreditBalanceDto[]> {
    const creditBalances = await this.model.aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      {
        $group: {
          _id: '$creditType',
          balance: { $sum: '$credits' },
        },
      },
    ])

    return (
      creditBalances
        // Filter out group credit type since these aren't tracked and are immediately consumed
        .filter(creditBalance => creditBalance._id != CreditTypesEnum.GROUP)
        .map(creditBalance => {
          return {
            creditType: creditBalance._id,
            balance: creditBalance.balance,
          }
        })
    )
  }
}
