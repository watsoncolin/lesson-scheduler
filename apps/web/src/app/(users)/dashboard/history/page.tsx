'use client'
import { CalendarIcon, CheckIcon, CreditCardIcon, HandThumbUpIcon, UserIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { get } from '@utils/api'
import { useInstructors, usePools } from '@contexts/index'
import { Product, Schedule, Student, Transaction } from '@lib/index'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function History() {
  const [transactions, setTransactions] = useState([] as Transaction[])
  const [products, setProducts] = useState([] as Product[])
  const [students, setStudents] = useState([] as Student[])
  const [schedules, setSchedules] = useState([] as Schedule[])
  const { instructors } = useInstructors()
  const { pools } = usePools()

  const fetchTransactions = async () => {
    try {
      const transactions = await get<Transaction[]>('/transactions/me')
      // sort by created at descending
      transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      setTransactions(transactions)

      const scheduleIds = transactions.filter(t => t.scheduleId).map(t => t.scheduleId)
      const uniqueScheduleIds = Array.from(new Set(scheduleIds))
      const queryString = uniqueScheduleIds.map(id => id).join(',')
      const schedules = await get<Schedule[]>('/schedules/?scheduleIds=' + queryString)
      setSchedules(schedules)
    } catch (err: any) {
      console.error(err)
    }
  }

  const fetchProducts = async () => {
    try {
      const products = await get<Product[]>('/products')
      setProducts(products)
    } catch (err: any) {
      console.error(err)
    }
  }

  const fetchStudents = async () => {
    try {
      const students = await get<Student[]>('/users/me/students')
      setStudents(students)
    } catch (err: any) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchTransactions()
    fetchProducts()
    fetchStudents()
  }, [])

  return (
    <>
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">History</h1>
          </div>
        </header>
        <main className="px-6">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-10">
            <ul role="list" className="-mb-8">
              {transactions.map((transaction, transactionIdx) => {
                const schedule = schedules.find(s => s.id === transaction.scheduleId)
                const product = products.find(p => p.id === transaction.productId)
                const student = students.find(s => s.id === transaction.studentId)
                const pool = pools.find(p => p.id === schedule?.poolId)
                const iconBackground =
                  transaction.transactionType === 'PURCHASE_CREDITS'
                    ? 'bg-green-500'
                    : transaction.transactionType === 'CANCEL_REGISTRATION'
                      ? 'bg-red-400'
                      : 'bg-blue-500'
                const Icon =
                  transaction.transactionType === 'PURCHASE_CREDITS' ? (
                    <CreditCardIcon className="h-5 w-5 text-white" aria-hidden="true" />
                  ) : (
                    <CalendarIcon className="h-5 w-5 text-white" aria-hidden="true" />
                  )

                const content =
                  transaction.transactionType === 'PURCHASE_CREDITS'
                    ? 'Purchased'
                    : transaction.transactionType == 'CANCEL_REGISTRATION'
                      ? 'Canceled lesson for'
                      : 'Scheduled lesson for'
                const target =
                  transaction.transactionType === 'PURCHASE_CREDITS' ? `${transaction.credits} credits` : student?.name
                let details = null
                if (transaction.transactionType == 'REGISTER' || transaction.transactionType == 'CANCEL_REGISTRATION') {
                  const startTimeFormatted = schedule
                    ? new Date(schedule.startDateTime).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })
                    : ''
                  details = ` with ${instructors.find(i => i.id === schedule?.instructorId)?.name} at ${pool?.name} on ${startTimeFormatted}`
                }

                const transactionDateFormatted = new Date(transaction.createdAt).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })

                return (
                  <li key={transaction.id}>
                    <div className="relative pb-8">
                      {transactionIdx !== transactions.length - 1 ? (
                        <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span
                            className={classNames(
                              iconBackground,
                              'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                            )}
                          >
                            {Icon}
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm text-gray-500">
                              {content} <span className="font-medium text-gray-900">{target}</span>
                            </p>
                            {details && <p className="text-sm text-gray-500">{details}</p>}
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            <time dateTime={transactionDateFormatted}>{transactionDateFormatted}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </main>
      </div>
    </>
  )
}
