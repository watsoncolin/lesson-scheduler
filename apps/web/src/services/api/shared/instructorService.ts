import { InstructorService as GeneratedInstructorService } from '@/api/services/InstructorService'
import type { CreateInstructorDto, UpdateInstructorDto } from '@/api'
import { BaseService, WithConfig } from './baseService'

@WithConfig()
export class InstructorService extends BaseService {
  static async findAll() {
    return GeneratedInstructorService.instructorControllerFindAll()
  }

  static async findOne(id: string) {
    return GeneratedInstructorService.instructorControllerFindOne(id)
  }

  static async create(data: CreateInstructorDto) {
    return GeneratedInstructorService.instructorControllerCreate(data)
  }

  static async update(id: string, data: UpdateInstructorDto) {
    return GeneratedInstructorService.instructorControllerUpdate(id, data)
  }

  static async remove(id: string) {
    return GeneratedInstructorService.instructorControllerRemove(id)
  }
}
