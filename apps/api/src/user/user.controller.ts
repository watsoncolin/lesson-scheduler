import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpCode, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ActiveUser } from '../iam/authentication/decorators/active-user.decorator'
import { ActiveUserData } from '../iam/authentication/interfaces/active-user-data.interface'
import {
  PaginationDto,
  IUser,
  PaginatedResponseDto,
  Role,
  UserSearchRequestDto,
  UserSearchResponseDto,
} from '@lesson-scheduler/shared'
import { Roles } from 'iam/authentication/decorators/roles.decorator'
import { StudentService } from 'student/student.service'

@Roles(Role.Admin)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly studentService: StudentService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get()
  async findAll(
    @Query() userSearchRequestDto: UserSearchRequestDto,
    @ActiveUser() user: ActiveUserData,
  ): Promise<PaginatedResponseDto<UserSearchResponseDto>> {
    const { users, total } = await this.userService.findAll(userSearchRequestDto.page, userSearchRequestDto.limit)

    const allStudents = await Promise.all(
      users.map(async user => {
        const students = await this.studentService.findAllByUserId(user.id)
        return {
          userId: user.id,
          students,
        }
      }),
    )

    const data: UserSearchResponseDto[] = []

    for (const user of users) {
      const students = allStudents
        .find(students => students.userId === user.id)
        ?.students.map(student => ({
          id: student.id,
          userId: student.userId,
          name: student.name,
          birthday: student.birthday,
        }))

      data.push({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        unusedCredits: 0,
        totalCredits: 0,
        students: students ?? [],
      })
    }

    return {
      data,
      total,
      page: userSearchRequestDto.page || 1,
      limit: userSearchRequestDto.limit || 50,
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: ActiveUserData) {
    return this.userService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
