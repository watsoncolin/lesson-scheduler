import { Controller, Get, Post, Body, Patch, Param, Delete, Req, NotFoundException } from '@nestjs/common'
import { StudentsService } from './students.service'
import { CreateStudentDto } from './dto/create-student.dto'
import { UpdateStudentDto } from './dto/update-student.dto'
import { ActiveUser } from '../iam/authentication/decorators/active-user.decorator'
import { ActiveUserData } from '../iam/authentication/interfaces/active-user-data.interface'

@Controller('users/me/students')
export class MyStudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@ActiveUser() user: ActiveUserData, @Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create({
      ...createStudentDto,
      userId: user.sub,
    })
  }

  @Get()
  findMyStudents(@ActiveUser() user: ActiveUserData) {
    return this.studentsService.findAllByUserId(user.sub)
  }

  @Get(':id')
  async findOne(@ActiveUser() user: ActiveUserData, @Param('id') id: string) {
    const students = await this.studentsService.findAllByUserId(user.sub)
    const student = students.find(student => student.id === id)
    if (!student) {
      throw new NotFoundException()
    }
    return student
  }

  @Patch(':id')
  async update(
    @ActiveUser() user: ActiveUserData,
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    const students = await this.studentsService.findAllByUserId(user.sub)
    const student = students.find(student => student.id === id)
    if (!student) {
      throw new NotFoundException()
    }
    return this.studentsService.update({
      ...updateStudentDto,
      id,
    })
  }

  @Delete(':id')
  async remove(@ActiveUser() user: ActiveUserData, @Param('id') id: string) {
    const students = await this.studentsService.findAllByUserId(user.sub)
    const student = students.find(student => student.id === id)
    if (!student) {
      throw new NotFoundException()
    }
    return this.studentsService.remove(id)
  }
}
