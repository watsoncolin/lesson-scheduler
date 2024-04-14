import { Module } from '@nestjs/common'
import { StudentsService } from './students.service'
import { StudentsController } from './students.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { StudentEntity, StudentSchema } from './entities/student.entity'

@Module({
  imports: [MongooseModule.forFeature([{ name: StudentEntity.name, schema: StudentSchema }])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
