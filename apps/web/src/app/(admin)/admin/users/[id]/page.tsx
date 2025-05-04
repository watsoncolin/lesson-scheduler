import { Heading } from '@components/heading'
import { get, post } from '@utils/server-api'
import { CreditBalanceResponseDto, IUser } from '@lesson-scheduler/shared'
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/16/solid'
import { Button } from '@/app/components/button'
import Link from 'next/link'
import { DescriptionList, DescriptionTerm, DescriptionDetails } from '@/app/components/description-list'
import { Transaction } from '@/app/lib/transaction'
import { Table, TableHead, TableCell, TableRow, TableBody } from '@/app/components/table'
import { CreateTransactionForm } from './create-transaction-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'User Details',
}

export default async function UserDetailPage({ params }: any) {
  const user = await get<IUser>(`/users/${params.id}`)
  const transactions = await get<Transaction[]>(`/transactions/${params.id}`)
  const currentBalance = await get<CreditBalanceResponseDto>(`/transactions/${params.id}/credit-balance`)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/users">
          <Button>
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
        </Link>
        <Heading>User Details</Heading>
      </div>

      <h2 className="text-2xl font-bold">User Details</h2>
      <DescriptionList>
        <DescriptionTerm>Name</DescriptionTerm>
        <DescriptionDetails>
          {user.firstName} {user.lastName}
        </DescriptionDetails>

        <DescriptionTerm>Email</DescriptionTerm>
        <DescriptionDetails>{user.email}</DescriptionDetails>

        <DescriptionTerm>Phone</DescriptionTerm>
        <DescriptionDetails>{user.phone}</DescriptionDetails>

        <DescriptionTerm>Role</DescriptionTerm>
        <DescriptionDetails>{user.role}</DescriptionDetails>

        <DescriptionTerm>Address</DescriptionTerm>
        <DescriptionDetails>
          {user.address1}
          {user.address2 && <br />}
          {user.address2}
          <br />
          {user.city}, {user.state} {user.zip}
        </DescriptionDetails>

        <DescriptionTerm>Private Registration</DescriptionTerm>
        <DescriptionDetails>{user.privateRegistration ? 'Yes' : 'No'}</DescriptionDetails>

        <DescriptionTerm>Email Verified</DescriptionTerm>
        <DescriptionDetails>{user.isEmailVerified ? 'Yes' : 'No'}</DescriptionDetails>

        <DescriptionTerm>Google ID</DescriptionTerm>
        <DescriptionDetails>{user.googleId || 'Not connected'}</DescriptionDetails>

        <DescriptionTerm>Created At</DescriptionTerm>
        <DescriptionDetails>{new Date(user.createdAt).toLocaleString()}</DescriptionDetails>

        <DescriptionTerm>Updated At</DescriptionTerm>
        <DescriptionDetails>{new Date(user.updatedAt).toLocaleString()}</DescriptionDetails>

        <DescriptionTerm>Unused Credits</DescriptionTerm>
        <DescriptionDetails>{user.unusedCredits}</DescriptionDetails>
      </DescriptionList>
      <h2 className="text-2xl font-bold">Student Details</h2>
      <DescriptionList>
        {user.students?.map(student => (
          <div key={student.id}>
            <DescriptionTerm>{student.name}</DescriptionTerm>
            <DescriptionDetails>{student.notes}</DescriptionDetails>
          </div>
        ))}
      </DescriptionList>
      <h2 className="text-2xl font-bold">Transactions</h2>
      <div className="flex items-center gap-4 text-sm">
        Current Balance: {currentBalance.balances.find(balance => balance.creditType === 'private')?.balance}
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Transaction Type</TableCell>
            <TableCell>Credit Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Credits</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(transaction => {
            const typeLable =
              transaction.transactionType === 'PURCHASE_CREDITS'
                ? 'Purchase Credits'
                : transaction.transactionType === 'REGISTER'
                  ? 'Register'
                  : 'Cancel Registration'
            return (
              <TableRow key={transaction.id}>
                <TableCell>{typeLable}</TableCell>
                <TableCell>{transaction.creditType}</TableCell>
                <TableCell>${transaction.amount}</TableCell>
                <TableCell>{transaction.credits}</TableCell>
                <TableCell>{new Date(transaction.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <h2 className="text-2xl font-bold">Create Transaction</h2>
      <CreateTransactionForm userId={params.id} />
    </div>
  )
}
