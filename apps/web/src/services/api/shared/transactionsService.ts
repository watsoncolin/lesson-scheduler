import { TransactionsService as GeneratedTransactionsService } from '@/api/services/TransactionsService'
import { BaseService, WithConfig } from './baseService'
import type { CreateTransactionDto } from '@/api/models/CreateTransactionDto'

@WithConfig()
export class TransactionsService extends BaseService {
  /**
   * Get the current user's credit balance
   */
  static async getMyCreditBalance() {
    return GeneratedTransactionsService.transactionsControllerGetMyCreditBalance()
  }

  /**
   * Get a user's credit balance by userId (admin only)
   */
  static async getCreditBalance(userId: string) {
    return GeneratedTransactionsService.transactionsControllerGetCreditBalance(userId)
  }

  /**
   * Get all transactions (admin only)
   */
  static async findAll() {
    return GeneratedTransactionsService.transactionsControllerFindAll()
  }

  /**
   * Create a new transaction (admin only)
   */
  static async create(data: CreateTransactionDto) {
    return GeneratedTransactionsService.transactionsControllerCreate(data)
  }

  /**
   * Get the current user's transactions
   */
  static async findMy() {
    return GeneratedTransactionsService.transactionsControllerFindMy()
  }

  /**
   * Get transactions for a specific user (admin only)
   */
  static async findByUserId(userId: string) {
    return GeneratedTransactionsService.transactionsControllerFindByUserId(userId)
  }
}
