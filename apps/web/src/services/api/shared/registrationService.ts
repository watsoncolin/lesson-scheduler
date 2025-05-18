import { BaseService, WithConfig } from './baseService'
import { RegistrationService as GeneratedRegistrationService } from '@/api/services/RegistrationService'
import type { CreateRegistrationDto } from '@/api'

@WithConfig()
export class RegistrationService extends BaseService {
  static async create(id: string, data: CreateRegistrationDto) {
    return GeneratedRegistrationService.registrationControllerCreate(id, data)
  }

  static async findOne(id: string) {
    return GeneratedRegistrationService.registrationControllerFindOne(id)
  }

  static async remove(id: string, studentId: string) {
    return GeneratedRegistrationService.registrationControllerRemove(id, studentId)
  }
}
