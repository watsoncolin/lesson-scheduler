import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileService } from './file.service'
import { ActiveUser } from '../iam/authentication/decorators/active-user.decorator'
import { ActiveUserData } from '../iam/authentication/interfaces/active-user-data.interface'

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @ActiveUser() user: ActiveUserData) {
    if (!file) {
      throw new BadRequestException('No file uploaded')
    }

    // Validate file type
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type. Only JPEG, PNG and GIF are allowed')
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > maxSize) {
      throw new BadRequestException('File size too large. Maximum size is 5MB')
    }

    try {
      const url = await this.fileService.uploadFile(file, user.sub)
      return { url }
    } catch (error: any) {
      console.error('Error uploading file:', error)

      // Handle specific Google Cloud Storage errors
      if (error.message?.includes('uniform bucket-level access is enabled')) {
        throw new InternalServerErrorException('Storage configuration error. Please contact support.')
      }

      if (error.code === 403) {
        throw new InternalServerErrorException('Storage permission error. Please contact support.')
      }

      throw new InternalServerErrorException('Failed to upload file. Please try again later.')
    }
  }
}
