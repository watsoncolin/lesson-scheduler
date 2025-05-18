import { Controller, Get, Param } from '@nestjs/common'
import { StudentService } from './student.service'
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger'
import { Role } from 'iam/role.enum'
import { Roles } from 'iam/authentication/decorators/roles.decorator'
import { StudentResponseDto } from './dto/student-response.dto'

@ApiTags('Student')
@Roles(Role.Admin)
@Controller('users/:userId/students')
export class UserStudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all students for a user' })
  @ApiOkResponse({ type: StudentResponseDto, isArray: true })
  findAllByUserId(@Param('userId') userId: string) {
    return this.studentService.findAllByUserId(userId)
  }
}
