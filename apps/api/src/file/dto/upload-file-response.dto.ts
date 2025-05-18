import { ApiProperty } from '@nestjs/swagger'

export class UploadFileResponseDto {
  @ApiProperty({ description: 'URL of the uploaded file' })
  url: string
}
