import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger'

import { CreatePoolDto } from './dto/create-pool.dto'
import { UpdatePoolDto } from './dto/update-pool.dto'
import { PoolService } from './pool.service'
import { Auth } from 'iam/authentication/decorators/auth.decorator'
import { AuthType } from 'iam/authentication/enums/auth-type.enum'
import { PoolDto } from './dto/pool.dto'

@ApiTags('Pools')
@Controller('pools')
export class PoolController {
  constructor(private readonly poolService: PoolService) {}

  @Get('')
  @Auth(AuthType.None)
  @ApiOperation({ summary: 'Get all pools' })
  @ApiResponse({ status: 200, description: 'List of pools', type: PoolDto, isArray: true })
  async findAll() {
    const pools = await this.poolService.findAll()
    return pools
  }

  // TODO add role guard
  @Post()
  @ApiOperation({ summary: 'Create a new pool' })
  @ApiBody({ type: CreatePoolDto })
  @ApiResponse({ status: 201, description: 'Pool created', type: PoolDto })
  create(@Body() createPoolDto: CreatePoolDto) {
    return this.poolService.create(createPoolDto)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a pool by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Pool found', type: PoolDto })
  @ApiResponse({ status: 404, description: 'Pool not found' })
  async findOne(@Param('id') id: string) {
    const pool = await this.poolService.findOne(id)
    if (!pool) {
      throw new NotFoundException()
    }
    return pool
  }

  // TODO add role guard
  @Patch(':id')
  @ApiOperation({ summary: 'Update a pool by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdatePoolDto })
  @ApiResponse({ status: 200, description: 'Pool updated', type: PoolDto })
  @ApiResponse({ status: 404, description: 'Pool not found' })
  async update(@Param('id') id: string, @Body() updatePoolDto: UpdatePoolDto) {
    const pool = await this.poolService.findOne(id)
    if (!pool) {
      throw new NotFoundException()
    }
    return this.poolService.update({
      ...updatePoolDto,
      id,
    })
  }

  // TODO add role guard
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a pool by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204, description: 'Pool deleted' })
  @ApiResponse({ status: 404, description: 'Pool not found' })
  async remove(@Param('id') id: string) {
    const pool = await this.poolService.findOne(id)
    if (!pool) {
      throw new NotFoundException()
    }
    return this.poolService.remove(id)
  }
}
