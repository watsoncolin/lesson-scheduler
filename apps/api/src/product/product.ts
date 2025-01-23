import { LessonTypesEnum } from 'shared/lesson-types.enum'

export class Product {
  id: string
  name: string
  lessonType: LessonTypesEnum
  credits: number
  active: boolean
  amount: number
  description: string
  scheduleId?: string
}
