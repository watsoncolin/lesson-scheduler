import { Controller, Get, Post, Body, Patch, Param, Delete, Req, NotFoundException, HttpCode } from '@nestjs/common'
import { StudentService } from './student.service'
import { CreateStudentDto } from './dto/create-student.dto'
import { UpdateStudentDto } from './dto/update-student.dto'
import { ActiveUser } from '../iam/authentication/decorators/active-user.decorator'
import { ActiveUserData } from '../iam/authentication/interfaces/active-user-data.interface'
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger'
import { StudentResponseDto } from './dto/student-response.dto'

@ApiTags('MyStudent')
@Controller('users/me/students')
export class MyStudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a student for the current user' })
  @ApiBody({ type: CreateStudentDto })
  @ApiResponse({ status: 201, description: 'Student created', type: StudentResponseDto })
  create(@ActiveUser() user: ActiveUserData, @Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create({
      ...createStudentDto,
      userId: user.sub,
    })
  }

  @Get()
  @ApiOperation({ summary: 'Get all students for the current user' })
  @ApiResponse({ status: 200, description: 'List of students', type: StudentResponseDto, isArray: true })
  findMyStudents(@ActiveUser() user: ActiveUserData) {
    return this.studentService.findAllByUserId(user.sub)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a student by ID for the current user' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @ApiResponse({ status: 200, description: 'Student found', type: StudentResponseDto })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async findOne(@ActiveUser() user: ActiveUserData, @Param('id') id: string) {
    const students = await this.studentService.findAllByUserId(user.sub)
    const student = students.find(student => student.id === id)
    if (!student) {
      throw new NotFoundException()
    }
    return student
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a student by ID for the current user' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @ApiBody({ type: UpdateStudentDto })
  @ApiResponse({ status: 200, description: 'Student updated', type: StudentResponseDto })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async update(
    @ActiveUser() user: ActiveUserData,
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    const students = await this.studentService.findAllByUserId(user.sub)
    const student = students.find(student => student.id === id)
    if (!student) {
      throw new NotFoundException()
    }
    return this.studentService.update({
      ...updateStudentDto,
      id,
    })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a student by ID for the current user' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @ApiResponse({ status: 204, description: 'Student deleted' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @HttpCode(204)
  async remove(@ActiveUser() user: ActiveUserData, @Param('id') id: string) {
    const students = await this.studentService.findAllByUserId(user.sub)
    const student = students.find(student => student.id === id)
    if (!student) {
      throw new NotFoundException()
    }
    return this.studentService.remove(id)
  }
}
