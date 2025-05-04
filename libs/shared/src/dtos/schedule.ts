import { IsArray, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { Transform } from 'class-transformer'
import { LessonTypesEnum } from '../enums/lesson-types.enum'
import { StudentDto } from './student'
import { UserDto } from './user'
export class CreateScheduleDto {
  @IsString()
  poolId!: string

  @IsString()
  instructorId!: string

  @IsEnum(LessonTypesEnum)
  lessonType!: LessonTypesEnum

  @IsNumber()
  classSize!: number

  @IsDateString()
  startDateTime!: string

  @IsDateString()
  endDateTime!: string
}

export class UpdateScheduleDto {
  @IsString()
  id!: string

  @IsString()
  @IsOptional()
  poolId?: string

  @IsString()
  @IsOptional()
  instructorId?: string

  @IsEnum(LessonTypesEnum)
  @IsOptional()
  lessonType?: LessonTypesEnum

  @IsNumber()
  @IsOptional()
  classSize?: number

  @IsDateString()
  @IsOptional()
  startDateTime?: string

  @IsDateString()
  @IsOptional()
  endDateTime?: string
}

export class SearchScheduleDto {
  @Transform(({ value }) => {
    return value?.split(',').map((item: string) => item.trim()) ?? []
  })
  @IsArray()
  @IsOptional()
  pools?: string[]

  @Transform(({ value }) => {
    return value?.split(',').map((item: string) => item.trim()) ?? []
  })
  @IsArray()
  @IsOptional()
  instructors?: string[]

  @Transform(({ value }) => {
    return value?.split(',').map((item: string) => item.trim()) ?? []
  })
  @IsArray()
  @IsOptional()
  daysOfWeek?: string[]

  @IsDateString()
  @IsOptional()
  date?: string
}

export class CreateRegistrationDto {
  @IsString()
  userId!: string

  @IsString()
  studentId!: string
}

export class RegistrationDto {
  userId: string
  studentId: string
  createdAt: string
  student: StudentDto
  user: UserDto
}

export class ScheduleDto {
  id: string
  poolId: string
  instructorId: string
  classSize: number
  lessonType: LessonTypesEnum
  startDateTime: string
  endDateTime: string
  registrations: RegistrationDto[]
}
