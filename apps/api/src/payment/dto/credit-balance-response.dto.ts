import { ApiProperty } from '@nestjs/swagger'
import { CreditTypesEnum } from 'shared/credit-types.enum'

export class CreditBalanceDto {
  @ApiProperty({ enum: CreditTypesEnum })
  creditType: CreditTypesEnum

  @ApiProperty()
  balance: number
}

export class CreditBalanceResponseDto {
  @ApiProperty({ type: [CreditBalanceDto] })
  balances: CreditBalanceDto[]
}
