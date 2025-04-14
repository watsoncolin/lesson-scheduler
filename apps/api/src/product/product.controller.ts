import { Controller, Get, Post, Body, Patch, Param, Delete, Req, NotFoundException, HttpCode } from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Auth } from 'iam/authentication/decorators/auth.decorator'
import { AuthType } from 'iam/authentication/enums/auth-type.enum'
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  @Auth(AuthType.None)
  async findAll() {
    const products = await this.productService.findAll()
    return products.sort((a, b) => a.order ?? 0 - b.order ?? 0)
  }

  // TODO add role guard
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id)
    if (!product) {
      throw new NotFoundException()
    }
    return product
  }

  // TODO add role guard
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const product = await this.productService.findOne(id)
    if (!product) {
      throw new NotFoundException()
    }
    return this.productService.update({
      ...updateProductDto,
      id,
    })
  }

  // TODO add role guard
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const product = await this.productService.findOne(id)
    if (!product) {
      throw new NotFoundException()
    }
    return this.productService.remove(id)
  }
}
