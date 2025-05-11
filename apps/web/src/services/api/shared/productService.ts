import { ProductService as GeneratedProductService } from '@/api/services/ProductService'
import type { CreateProductDto, UpdateProductDto } from '@/api'
import { BaseService } from './baseService'

export class ProductService extends BaseService {
  static async findAll() {
    return GeneratedProductService.productControllerFindAll()
  }

  static async findOne(id: string) {
    return GeneratedProductService.productControllerFindOne(id)
  }

  static async create(data: CreateProductDto) {
    return GeneratedProductService.productControllerCreate(data)
  }

  static async update(id: string, data: UpdateProductDto) {
    return GeneratedProductService.productControllerUpdate(id, data)
  }

  static async remove(id: string) {
    return GeneratedProductService.productControllerRemove(id)
  }
}
