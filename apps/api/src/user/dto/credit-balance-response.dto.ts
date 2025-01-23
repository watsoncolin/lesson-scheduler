import { CreditTypesEnum } from 'shared/credit-types.enum'

export class CreditBalanceResponseDto {
  balances: Array<{
    creditType: CreditTypesEnum
    balance: number
  }>
}
