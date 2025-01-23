import { CreditTypesEnum } from 'shared/credit-types.enum'

export class CreditBalanceDto {
  creditType: CreditTypesEnum
  balance: number
}
