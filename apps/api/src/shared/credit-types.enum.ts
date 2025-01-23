import { LessonTypesEnum } from './lesson-types.enum'

// Mirror the LessonTypesEnum to CreditTypesEnum for now.
export enum CreditTypesEnum {
  PRIVATE = LessonTypesEnum.PRIVATE,
  GROUP = LessonTypesEnum.GROUP,
}
