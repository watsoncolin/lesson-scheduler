import { BaseService, WithConfig } from './baseService'
import { UsersService } from '@/api/services/UsersService'
import type { CreateUserDto } from '@/api/models/CreateUserDto'
import type { UpdateUserDto } from '@/api/models/UpdateUserDto'
import type { PaginatedResponseDto } from '@/api/models/PaginatedResponseDto'

@WithConfig()
export class UserService extends BaseService {
  static async create(data: CreateUserDto) {
    return UsersService.userControllerCreate(data)
  }

  static async findAll(page = 1, limit = 50, name?: string, phone?: string): Promise<PaginatedResponseDto> {
    return UsersService.userControllerFindAll(page, limit, name, phone)
  }

  static async findOne(id: string) {
    return UsersService.userControllerFindOne(id)
  }

  static async update(id: string, data: UpdateUserDto) {
    return UsersService.userControllerUpdate(id, data)
  }

  static async remove(id: string) {
    return UsersService.userControllerRemove(id)
  }
}
