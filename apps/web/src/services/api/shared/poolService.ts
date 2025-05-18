import { PoolsService as GeneratedPoolService } from '@/api/services/PoolsService'
import type { CreatePoolDto, UpdatePoolDto } from '@/api'
import { BaseService, WithConfig } from './baseService'

@WithConfig()
export class PoolService extends BaseService {
  static async findAll() {
    return GeneratedPoolService.poolControllerFindAll()
  }

  static async findOne(id: string) {
    return GeneratedPoolService.poolControllerFindOne(id)
  }

  static async create(data: CreatePoolDto) {
    return GeneratedPoolService.poolControllerCreate(data)
  }

  static async update(id: string, data: UpdatePoolDto) {
    return GeneratedPoolService.poolControllerUpdate(id, data)
  }

  static async remove(id: string) {
    return GeneratedPoolService.poolControllerRemove(id)
  }
}
