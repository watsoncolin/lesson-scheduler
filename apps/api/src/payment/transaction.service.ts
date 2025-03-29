import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { TransactionEntity } from './entities/transaction.entity'
import { Transaction } from './transaction'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { CreditBalanceDto } from './dto/credit-balance.dto'
import { CreditTypesEnum } from 'shared/credit-types.enum'
import { EventBus } from '@nestjs/cqrs'
import { TransactionCreatedEvent } from './events'

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
    studentId: entity.studentId ? entity.studentId.toString() : undefined,
  }
}

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(TransactionEntity.name)
    private readonly model: Model<TransactionEntity>,
    private readonly eventBus: EventBus,
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
      studentId: createTransactionDto.studentId ? new ObjectId(createTransactionDto.studentId) : undefined,
    })
    const entity = await this.model.findById(result._id)
    if (!entity) {
      throw new Error('Transaction not found')
    }
    const transaction = mapper(entity)
    this.eventBus.publish(new TransactionCreatedEvent(transaction))
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

    return creditBalances.map(creditBalance => {
      return {
        creditType: creditBalance._id,
        balance: creditBalance.balance,
      }
    })
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    return (await this.model.find({ userId: new ObjectId(userId) })).map(mapper)
  }
}
