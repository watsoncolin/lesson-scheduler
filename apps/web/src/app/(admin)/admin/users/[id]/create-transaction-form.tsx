'use client'

import { Button } from '@/app/components/button'
import { Input } from '@/app/components/input'
import { Select } from '@/app/components/select'
import { TransactionsService } from '@/services/api/shared/transactionsService'
import { CreateTransactionDto } from '@/api'
import { useRouter } from 'next/navigation'

interface CreateTransactionFormProps {
  userId: string
}

export function CreateTransactionForm({ userId }: CreateTransactionFormProps) {
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const response = await TransactionsService.create({
      userId,
      transactionType: formData.get('transactionType') as CreateTransactionDto.transactionType,
      creditType: formData.get('creditType') as CreateTransactionDto.creditType,
      credits: Number(formData.get('credits')),
      amount: formData.get('amount') ? Number(formData.get('amount')) : undefined,
    })

    if (response) {
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="transactionType" className="block text-sm font-medium text-gray-700">
          Transaction Type
        </label>
        <Select id="transactionType" name="transactionType" className="mt-1 block w-full">
          <option value="PURCHASE_CREDITS">Purchase Credits</option>
          <option value="REGISTER">Register</option>
          <option value="CANCEL_REGISTRATION">Cancel Registration</option>
        </Select>
      </div>

      <div>
        <label htmlFor="creditType" className="block text-sm font-medium text-gray-700">
          Credit Type
        </label>
        <Select id="creditType" name="creditType" className="mt-1 block w-full">
          <option value="private">Private</option>
          <option value="group">Group</option>
        </Select>
      </div>

      <div>
        <label htmlFor="credits" className="block text-sm font-medium text-gray-700">
          Credits
        </label>
        <Input type="number" id="credits" name="credits" className="mt-1 block w-full" required />
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount (optional)
        </label>
        <Input type="number" id="amount" name="amount" className="mt-1 block w-full" min="0" step="0.01" />
      </div>

      <Button type="submit">Create Transaction</Button>
    </form>
  )
}
