import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode, Put } from '@nestjs/common'

import { InstructorService } from './instructor.service'
import { CreateInstructorDto } from './dto/create-instructor.dto'
import { UpdateInstructorDto } from './dto/update-instructor.dto'
import { Auth } from 'iam/authentication/decorators/auth.decorator'
import { AuthType } from 'iam/authentication/enums/auth-type.enum'

@Controller('instructors')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Get('')
  @Auth(AuthType.None)
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
  @Put(':id')
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
