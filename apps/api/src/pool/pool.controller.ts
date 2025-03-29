import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common'

import { CreatePoolDto } from './dto/create-pool.dto'
import { UpdatePoolDto } from './dto/update-pool.dto'
import { PoolService } from './pool.service'

@Controller('pools')
export class PoolController {
  constructor(private readonly poolService: PoolService) {}

  @Get('')
  async findAll() {
    const pools = await this.poolService.findAll()
    return pools
  }

  // TODO add role guard
  @Post()
  create(@Body() createPoolDto: CreatePoolDto) {
    return this.poolService.create(createPoolDto)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const pool = await this.poolService.findOne(id)
    if (!pool) {
      throw new NotFoundException()
    }
    return pool
  }

  // TODO add role guard
  @Patch(':id')
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
  async remove(@Param('id') id: string) {
    const pool = await this.poolService.findOne(id)
    if (!pool) {
      throw new NotFoundException()
    }
    return this.poolService.remove(id)
  }
}
