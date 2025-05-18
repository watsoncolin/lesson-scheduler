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
import * as multer from 'multer'
import { ApiTags, ApiOperation, ApiOkResponse, ApiConsumes, ApiBody } from '@nestjs/swagger'
import { UploadFileResponseDto } from './dto/upload-file-response.dto'

const uploadInterceptor = FileInterceptor('file', {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
})

@ApiTags('files')
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'The file to upload',
        },
      },
      required: ['file'],
    },
  })
  @ApiOkResponse({ type: UploadFileResponseDto })
  @UseInterceptors(uploadInterceptor)
  async uploadFile(@UploadedFile() file: Express.Multer.File, @ActiveUser() user: ActiveUserData) {
    if (!file) {
      throw new BadRequestException('No file uploaded')
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type. Only JPEG, PNG and GIF are allowed')
    }
    if (!file.buffer || file.buffer.length === 0) {
      throw new BadRequestException('Uploaded file buffer is empty.')
    }

    if (file.buffer.length !== file.size) {
      throw new BadRequestException('Uploaded file is incomplete or corrupted.')
    }

    try {
      const url = await this.fileService.uploadFile(file, user.sub)
      return { url }
    } catch (error: any) {
      console.error('Error uploading file:', error)

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
