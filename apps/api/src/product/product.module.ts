import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductEntity, ProductSchema } from './entities/product.entity'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'

@Module({
  imports: [MongooseModule.forFeature([{ name: ProductEntity.name, schema: ProductSchema }])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
