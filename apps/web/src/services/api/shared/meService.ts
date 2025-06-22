import { BaseService, WithConfig } from './baseService'
import { MeService as GeneratedMeService, UsersService } from '@/api'
import type { UpdateUserDto, WaiverDto } from '@/api'

@WithConfig()
export class MeService extends BaseService {
  static async findMe() {
    return GeneratedMeService.meControllerFindMe()
  }

  static async findUserById(id: string) {
    return UsersService.userControllerFindOne(id)
  }

  static async update(data: UpdateUserDto) {
    return GeneratedMeService.meControllerUpdate(data)
  }

  static async remove() {
    return GeneratedMeService.meControllerRemove()
  }

  static async updateWaiver(data: WaiverDto) {
    return GeneratedMeService.meControllerUpdateWaiver(data)
  }
}
