import { LessonTypesEnum } from 'shared/lesson-types.enum'
import { Registration } from './registration'

export class Schedule {
  id: string
  poolId: string
  instructorId: string
  classSize: number
  lessonType: LessonTypesEnum
  startDateTime: Date
  endDateTime: Date
  registrations: Registration[]
}
