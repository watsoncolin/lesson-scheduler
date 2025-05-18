import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString, IsDate } from 'class-validator'
import { Transform } from 'class-transformer'

export class WaiverDto {
  @ApiProperty({ description: 'Whether the user has signed the waiver' })
  @IsBoolean()
  signedWaiver: boolean

  @ApiProperty({ description: 'Signature of the user for the waiver' })
  @IsString()
  waiverSignature: string

  @ApiProperty({ description: 'Date the waiver was signed', type: String, format: 'date-time' })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  waiverSignatureDate: Date
}
