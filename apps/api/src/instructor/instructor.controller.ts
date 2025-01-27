import { Controller, Get, Post, Body, Patch, Param, Delete, Req, NotFoundException, HttpCode } from '@nestjs/common'

import { InstructorService } from './instructor.service'
import { CreateInstructorDto } from './dto/create-instructor.dto'
import { UpdateInstructorDto } from './dto/update-instructor.dto'
import { ApiResponse } from '@nestjs/swagger'

@Controller('instructors')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Get('')
  async findAll() {
    const instructors = await this.instructorService.findAll()
    return instructors
  }

  // TODO add role guard
  @Post()
  create(@Body() createInstructorDto: CreateInstructorDto) {
    return this.instructorService.create(createInstructorDto)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const instructor = await this.instructorService.findOne(id)
    if (!instructor) {
      throw new NotFoundException()
    }
    return instructor
  }

  // TODO add role guard
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateInstructorDto: UpdateInstructorDto) {
    const instructor = await this.instructorService.findOne(id)
    if (!instructor) {
      throw new NotFoundException()
    }
    return this.instructorService.update({
      ...updateInstructorDto,
      id,
    })
  }

  // TODO add role guard
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const instructor = await this.instructorService.findOne(id)
    if (!instructor) {
      throw new NotFoundException()
    }
    return this.instructorService.remove(id)
  }
}
