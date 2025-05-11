import { ScheduleService as GeneratedScheduleService } from '@/api/services/ScheduleService'
import type { CreateScheduleDto, UpdateScheduleDto } from '@/api'
import { BaseService } from './baseService'

export class ScheduleService extends BaseService {
  static async findAll() {
    return GeneratedScheduleService.scheduleControllerFindAll()
  }

  static async findOne(id: string) {
    return GeneratedScheduleService.scheduleControllerFindOne(id)
  }

  static async create(data: CreateScheduleDto) {
    return GeneratedScheduleService.scheduleControllerCreate(data)
  }

  static async update(id: string, data: UpdateScheduleDto) {
    return GeneratedScheduleService.scheduleControllerUpdate(id, data)
  }

  static async remove(id: string) {
    return GeneratedScheduleService.scheduleControllerRemove(id)
  }

  static async findParentTot() {
    return GeneratedScheduleService.scheduleControllerFindAllParentTot()
  }

  static async findMySchedule() {
    return GeneratedScheduleService.scheduleControllerFindAllForLoggedInUser()
  }

  static async search() {
    return GeneratedScheduleService.scheduleControllerSearch()
  }

  static async findAvailableDates() {
    return GeneratedScheduleService.scheduleControllerFindAvailableDates()
  }
}
