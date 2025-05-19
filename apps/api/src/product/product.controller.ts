import { Controller, Get, Post, Body, Patch, Param, Delete, Req, NotFoundException, HttpCode } from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Auth } from 'iam/authentication/decorators/auth.decorator'
import { AuthType } from 'iam/authentication/enums/auth-type.enum'
import { Roles } from 'iam/authentication/decorators/roles.decorator'
import { Role } from '@lesson-scheduler/shared'
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger'
import { Product } from './product'
import { ProductResponseDto } from './dto/product-response.dto'

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  @Auth(AuthType.None)
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of products', type: ProductResponseDto, isArray: true })
  async findAll() {
    const products = await this.productService.findAll()
    return products.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  }

  @Roles(Role.Admin)
  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Product created', type: ProductResponseDto })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product found', type: ProductResponseDto })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id)
    if (!product) {
      throw new NotFoundException()
    }
    return product
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Product updated', type: ProductResponseDto })
  @ApiResponse({ status: 404, description: 'Product not found' })
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

  @Delete(':id')
  @Roles(Role.Admin)
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 204, description: 'Product deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async remove(@Param('id') id: string) {
    const product = await this.productService.findOne(id)
    if (!product) {
      throw new NotFoundException()
    }
    return this.productService.remove(id)
  }
}
