import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { InstructorEntity, InstructorSchema } from './entities/instructor.entity'
import { InstructorController } from './instructor.controller'
import { InstructorService } from './instructor.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: InstructorEntity.name, schema: InstructorSchema }])],
  controllers: [InstructorController],
  providers: [InstructorService],
})
export class InstructorModule {}
