import { LessonTypesEnum } from '../enums/lesson-types.enum'

export interface IRegistration {
  userId: string
  studentId: string
  createdAt: Date
  transactionId: string
}

export interface ISchedule {
  id: string
  poolId: string
  instructorId: string
  classSize: number
  lessonType: LessonTypesEnum
  startDateTime: Date
  endDateTime: Date
  registrations: IRegistration[]
  createdAt: Date
  updatedAt: Date
  spotsAvailable: number
}
