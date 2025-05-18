import { BaseService, WithConfig } from './baseService'
import { MyStudentService as GeneratedMyStudentService, StudentService as GeneratedStudentService } from '@/api'
import type { CreateStudentDto, UpdateStudentDto } from '@/api'

@WithConfig()
export class StudentService extends BaseService {
  static async findMyStudents() {
    return GeneratedMyStudentService.myStudentControllerFindMyStudents()
  }

  static async create(data: CreateStudentDto) {
    return GeneratedMyStudentService.myStudentControllerCreate(data)
  }

  static async update(id: string, data: UpdateStudentDto) {
    return GeneratedMyStudentService.myStudentControllerUpdate(id, data)
  }

  static async remove(id: string) {
    return GeneratedMyStudentService.myStudentControllerRemove(id)
  }

  static async findAllByUserId(userId: string) {
    return GeneratedStudentService.userStudentControllerFindAllByUserId(userId)
  }
}
