import { Injectable, NotFoundException } from '@nestjs/common'
import { TransactionService } from 'payment/transaction.service'
import { Stats } from './stats'
import { TransactionTypesEnum } from 'shared/transaction-types.enum'
import { CreditTypesEnum } from 'shared/credit-types.enum'
import { UserService } from 'user/user.service'
import { ScheduleService } from 'schedule/schedule.service'

@Injectable()
export class StatsService {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly userService: UserService,
    private readonly scheduleService: ScheduleService,
  ) {}

  async getStats(): Promise<Stats> {
    const privateLessons = await this.transactionService.countCredits({
      transactionType: TransactionTypesEnum.PurchaseCredits,
      creditType: CreditTypesEnum.PRIVATE,
    })
    const groupLessons = await this.transactionService.countCredits({
      transactionType: TransactionTypesEnum.PurchaseCredits,
      creditType: CreditTypesEnum.GROUP,
    })

    const scheduledPrivateLessons = await this.transactionService.countCredits({
      transactionType: TransactionTypesEnum.Register,
      creditType: CreditTypesEnum.PRIVATE,
    })

    const scheduledGroupLessons = await this.transactionService.countCredits({
      transactionType: TransactionTypesEnum.Register,
      creditType: CreditTypesEnum.GROUP,
    })

    const availablePrivateLessons = await this.scheduleService.countAvailablePrivateLessons()
    const availableGroupLessons = await this.scheduleService.countAvailableGroupLessons()

    return {
      purchaseCounts: {
        privateLessons,
        groupLessons,
      },
      lessonCounts: {
        available: availablePrivateLessons + availableGroupLessons,
        scheduled: scheduledPrivateLessons + scheduledGroupLessons,
        unscheduledPrivate: privateLessons - Math.abs(scheduledPrivateLessons),
        unscheduledGroup: groupLessons - Math.abs(scheduledGroupLessons),
      },
      userCounts: {
        active: await this.userService.countActiveUsers(),
      },
    }
  }

  async getInstructorStats(instructorId: string): Promise<Stats> {
    return {
      purchaseCounts: {
        privateLessons: 0,
        groupLessons: 0,
      },
      lessonCounts: {
        available: 0,
        scheduled: 0,
        unscheduledPrivate: 0,
        unscheduledGroup: 0,
      },
      userCounts: {
        active: 0,
      },
    }
  }
}
