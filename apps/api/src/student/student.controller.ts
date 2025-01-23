import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { StudentService } from './student.service'
import { CreateStudentDto } from './dto/create-student.dto'
import { UpdateStudentDto } from './dto/update-student.dto'

// TODO add role guard
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto)
  }

  // TODO add pagination
  @Get()
  findAll() {
    return this.studentService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(updateStudentDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id)
  }
}
