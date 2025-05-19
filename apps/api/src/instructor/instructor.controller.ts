import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode, Put } from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiNoContentResponse } from '@nestjs/swagger'

import { InstructorService } from './instructor.service'
import { CreateInstructorDto } from './dto/create-instructor.dto'
import { UpdateInstructorDto } from './dto/update-instructor.dto'
import { Auth } from 'iam/authentication/decorators/auth.decorator'
import { AuthType } from 'iam/authentication/enums/auth-type.enum'
import { InstructorResponseDto } from './dto/instructor-response.dto'
import { Instructor } from './instructor'
import { Roles } from 'iam/authentication/decorators/roles.decorator'
import { Role } from 'iam/role.enum'

function toResponseDto(instructor: Instructor): InstructorResponseDto {
  return {
    id: instructor.id,
    userId: instructor.userId?.toString(),
    name: instructor.name,
    bio: instructor.bio,
    imageUrl: instructor.imageUrl,
  }
}

@ApiTags('instructors')
@Controller('instructors')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Get('')
  @Auth(AuthType.None)
  @ApiOkResponse({ type: [InstructorResponseDto] })
  async findAll(): Promise<InstructorResponseDto[]> {
    const instructors = await this.instructorService.findAll()
    return instructors.map(toResponseDto)
  }

  @Post()
  @Roles(Role.Admin)
  @ApiCreatedResponse({ type: InstructorResponseDto })
  async create(@Body() createInstructorDto: CreateInstructorDto): Promise<InstructorResponseDto> {
    const instructor = await this.instructorService.create(createInstructorDto)
    return toResponseDto(instructor)
  }

  @Get(':id')
  @ApiOkResponse({ type: InstructorResponseDto })
  @ApiNotFoundResponse({ description: 'Instructor not found' })
  async findOne(@Param('id') id: string): Promise<InstructorResponseDto> {
    const instructor = await this.instructorService.findOne(id)
    if (!instructor) {
      throw new NotFoundException()
    }
    return toResponseDto(instructor)
  }

  @Put(':id')
  @ApiOkResponse({ type: InstructorResponseDto })
  @ApiNotFoundResponse({ description: 'Instructor not found' })
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateInstructorDto: UpdateInstructorDto,
  ): Promise<InstructorResponseDto> {
    const instructor = await this.instructorService.findOne(id)
    if (!instructor) {
      throw new NotFoundException()
    }
    const updated = await this.instructorService.update({
      ...updateInstructorDto,
      id,
    })
    return toResponseDto(updated)
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Instructor deleted' })
  @ApiNotFoundResponse({ description: 'Instructor not found' })
  @Roles(Role.Admin)
  async remove(@Param('id') id: string): Promise<void> {
    const instructor = await this.instructorService.findOne(id)
    if (!instructor) {
      throw new NotFoundException()
    }
    return this.instructorService.remove(id)
  }
}
