'use server'

import { post } from '@utils/server-api'
import { redirect } from 'next/navigation'

export async function createTransaction(userId: string, formData: FormData) {
  const transactionType = formData.get('transactionType') as string
  const creditType = formData.get('creditType') as string
  const credits = Number(formData.get('credits'))
  const amount = formData.get('amount') ? Number(formData.get('amount')) : undefined

  await post('/transactions', {
    userId,
    transactionType,
    creditType,
    credits,
    amount,
  })

  redirect(`/admin/users/${userId}`)
}
