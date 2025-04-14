import { LessonTypesEnum } from '../enums/lesson-types.enum'

export interface IProduct {
  id: string
  order: number
  name: string
  lessonType: LessonTypesEnum
  credits: number
  active: boolean
  amount: number
  description: string
  features: string[]
  scheduleId?: string
  createdAt: Date
  updatedAt: Date
}
