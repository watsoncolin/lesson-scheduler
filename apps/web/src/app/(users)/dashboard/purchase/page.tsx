'use client'
import { CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/20/solid'

import { useState, useEffect } from 'react'

import { ProductService } from '@/services/api/shared/productService'
import { ScheduleService } from '@/services/api/shared/scheduleService'
import { StudentService } from '@/services/api/shared/studentService'
import { PaymentService } from '@/services/api/shared/paymentService'
import { WaitlistService } from '@/services/api/shared/waitlistService'
import { ConfigService } from '@/services/api/shared/configService'
import React from 'react'
import { IProduct } from '@lesson-scheduler/shared'
import { ISchedule } from '@lesson-scheduler/shared'
import { IStudent } from '@lesson-scheduler/shared'
import { usePools } from '@contexts/pools-context'
import { useInstructors } from '@contexts/instructor-context'
import { useUser } from '@contexts/user-context'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { Button } from '@/app/components/button'
import { useRouter } from 'next/navigation'

// Extend the Window interface to include ApplePaySession
declare global {
  interface Window {
    ApplePaySession?: any
  }
}

export default function Purchase() {
  const router = useRouter()
  const [products, setProducts] = useState([] as IProduct[])
  const [selectedProductId, setSelectedProductId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [canUseApplePay, setCanUseApplePay] = useState(false)
  const [selectedScheduleId, setSelectedScheduleId] = useState('')
  const [selectedStudentId, setSelectedStudentId] = useState('')
  const [students, setStudents] = useState([] as IStudent[])
  const [waitlistEnabled, setWaitlistEnabled] = useState(false)
  const [schedules, setSchedules] = useState([] as ISchedule[])
  const { pools } = usePools()
  const { user } = useUser()
  const [onWaitlist, setOnWaitlist] = useState(false)
  const [purchaseEnabled, setPurchaseEnabled] = useState(false)

  useEffect(() => {
    if (window.ApplePaySession && window.ApplePaySession.canMakePayments()) {
      // setCanUseApplePay(true)
    }
  }, [])

  const isMissingContactInfo = !user?.phone || !user?.address1 || !user?.city || !user?.state || !user?.zip

  const fetchSchedules = async () => {
    try {
      const schedules = await ScheduleService.findParentTot()
      setSchedules(schedules)
    } catch (err: any) {
      console.error(err)
    }
  }

  const fetchStudents = async () => {
    try {
      const students = await StudentService.findMyStudents()
      setStudents(students)
    } catch (err: any) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchSchedules()
  }, [])

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchProducts = async () => {
    try {
      const products = await ProductService.findAll()
      setProducts(products)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const privateLessons = products.filter(p => p.lessonType == 'private')
  const groupLessons = products.filter(p => p.lessonType == 'group')

  useEffect(() => {
    fetchProducts()
  }, [])

  const paypalCreateOrder = async (): Promise<void> => {
    setError('')
    setPaymentCompleted(false)
    if (!user) {
      return router.push('/')
    }
    try {
      if (!selectedProductId) {
        setError('No product selected')
        return Promise.reject('No product selected')
      }
      const product = products.find(p => p.id == selectedProductId)
      let selectedQuantity = quantity
      if (product?.credits != 1) {
        setQuantity(1)
        selectedQuantity = 1
      }
      if (product?.lessonType == 'group' && !selectedScheduleId) {
        setError('Please select a session')
        return Promise.reject('Please select a session')
      }

      if (product?.lessonType == 'group' && !selectedStudentId) {
        setError('Please select a student')
        return Promise.reject('Please select a student')
      }

      const response = await PaymentService.createPaypalOrder({
        productId: selectedProductId,
        userId: user.id,
        quantity: selectedQuantity,
        scheduleId: selectedScheduleId,
        studentId: selectedStudentId,
      })
      return response.id
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    }
  }

  const paypalCaptureOrder = async (orderId: string): Promise<void> => {
    try {
      await PaymentService.captureOrder({ orderId })
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    }

    setPaymentCompleted(true)
  }

  useEffect(() => {
    const fetchConfig = async () => {
      const response = await ConfigService.findOne()
      setWaitlistEnabled(response.waitlistEnabled)
    }
    fetchConfig()
  }, [])

  useEffect(() => {
    const fetchOnWaitlist = async () => {
      try {
        const response = await WaitlistService.me()
        setOnWaitlist(true)
        setPurchaseEnabled(response.allowed)
      } catch (err: any) {
        console.error(err)
        setOnWaitlist(false)
        setPurchaseEnabled(false)
      }
    }
    fetchOnWaitlist()
  }, [])

  const joinWaitlist = async () => {
    await WaitlistService.join()
    setOnWaitlist(true)
  }

  const handlePayWithApplePay = async () => {
    const product = products.find(p => p.id == selectedProductId)
    const session = new window.ApplePaySession(3, {
      countryCode: 'US',
      currencyCode: 'USD',
      merchantCapabilities: ['supports3DS'],
      supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
      total: { label: 'Stansbury Swim', amount: product?.amount ?? 0 * quantity },
    })
    session.onvalidatemerchant = async (event: { validationURL: any }) => {
      const response = await PaymentService.validateMerchant({ validationUrl: event.validationURL })
      const merchantSession = await response.json()
      session.completeMerchantValidation(merchantSession)
    }
    session.onpaymentauthorized = (event: { payment: any }) => {
      const payment = event.payment
      console.log(payment)
      // Process the payment with your backend
      // On success:
      session.completePayment(window.ApplePaySession.STATUS_SUCCESS)
      // On failure:
      session.completePayment(window.ApplePaySession.STATUS_FAILURE)
    }
    session.begin()
  }

  return (
    <>
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Purchase</h1>
          </div>
        </header>
        <main className="px-6">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-10">
            {waitlistEnabled && !purchaseEnabled && (
              <div className="mt-2 border-l-4 border-yellow-400 bg-yellow-50 p-4">
                <div className="flex">
                  <div className="shrink-0">
                    <ExclamationTriangleIcon aria-hidden="true" className="size-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    {onWaitlist ? (
                      <p className="text-sm text-yellow-700">
                        You are currently on the waitlist. You will be notified when you are allowed to purchase
                        lessons.
                      </p>
                    ) : (
                      <p className="text-sm text-yellow-700">
                        The waitlist is currently enabled. Please join the waitlist to purchase lessons.
                      </p>
                    )}
                    {!onWaitlist ? (
                      <div className="ml-auto pl-3 mt-2">
                        <Button
                          type="button"
                          onClick={() => {
                            joinWaitlist()
                          }}
                        >
                          Join waitlist
                        </Button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            )}
            {isMissingContactInfo && (
              <div className="mb-6 border-l-4 border-yellow-400 bg-yellow-50 p-4">
                <div className="flex">
                  <div className="shrink-0">
                    <ExclamationTriangleIcon aria-hidden="true" className="size-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Please complete your contact information before making a purchase.{' '}
                      <a href="/dashboard/profile" className="font-medium underline">
                        Update your profile
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}
            <fieldset aria-label="products" className="-space-y-px rounded-md bg-white">
              {privateLessons.map(product => (
                <label
                  key={product.id}
                  aria-label={product.name}
                  aria-description={product.description}
                  className="group flex cursor-pointer border border-gray-200 p-4 first:rounded-tl-md first:rounded-tr-md last:rounded-bl-md last:rounded-br-md focus:outline-none"
                >
                  <input
                    value={product.name}
                    checked={selectedProductId == product.id}
                    onChange={() => setSelectedProductId(product.id)}
                    name="product"
                    type="radio"
                    style={{
                      border: '1px solid #D1D5DB',
                    }}
                    className="relative mt-0.5 size-4 shrink-0 appearance-none rounded-full border-[3px] border-gray-400 bg-white checked:bg-indigo-600 checked:border-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100"
                    disabled={isMissingContactInfo}
                  />
                  <div className="flex flex-col flex-1">
                    <span className="ml-3 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900 ">{product.name}</span>
                      <span className="block text-sm text-gray-500 ">{product.description}</span>
                    </span>
                  </div>
                  {product.credits == 1 ? (
                    <div>
                      <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                        Quantity
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="quantity"
                          name="quantity"
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          onChange={e => setQuantity(parseInt(e.target.value))}
                          disabled={isMissingContactInfo}
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                        </select>
                      </div>
                    </div>
                  ) : null}
                </label>
              ))}
              {groupLessons.map(product => (
                <label
                  key={product.id}
                  aria-label={product.name}
                  aria-description={product.description}
                  className="group flex cursor-pointer border border-gray-200 p-4 first:rounded-tl-md first:rounded-tr-md last:rounded-bl-md last:rounded-br-md focus:outline-none"
                >
                  <input
                    value={product.name}
                    checked={selectedProductId == product.id}
                    onChange={() => setSelectedProductId(product.id)}
                    name="product"
                    type="radio"
                    className="relative mt-0.5 size-4 shrink-0 appearance-none rounded-full border-[3px] border-gray-400 bg-white checked:bg-indigo-600 checked:border-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100"
                    disabled={isMissingContactInfo}
                  />
                  <div className="flex flex-col flex-1">
                    <span className="ml-3 flex flex-col">
                      <span className="block text-sm font-medium text-gray-900 ">{product.name}</span>
                      <span className="block text-sm text-gray-500 ">{product.description}</span>
                    </span>
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                      Session
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                      <select
                        id="quantity"
                        name="quantity"
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        onChange={e => setSelectedScheduleId(e.target.value)}
                        disabled={isMissingContactInfo}
                      >
                        <option>select a parent and tot session</option>
                        {schedules
                          .filter(s => s.spotsAvailable && s.spotsAvailable > 0)
                          .map(schedule => {
                            const pool = pools.find(pool => pool.id === schedule.poolId)?.name
                            const formatted = new Date(schedule.startDateTime).toLocaleString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                            })
                            return (
                              <option key={schedule.id} value={schedule.id}>
                                {formatted} at {pool}
                              </option>
                            )
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="px-4">
                    <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                      Student
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                      <select
                        id="quantity"
                        name="quantity"
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        onChange={e => setSelectedStudentId(e.target.value)}
                        disabled={isMissingContactInfo}
                      >
                        <option>select a student</option>
                        {students.map(student => (
                          <option key={student.id} value={student.id}>
                            {student.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </label>
              ))}
            </fieldset>
            <div className="mt-4">
              <div className="flex space-x-4">
                <PayPalScriptProvider
                  options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
                    currency: 'USD',
                    intent: 'capture',
                    disableFunding: ['paylater', 'card'],
                  }}
                >
                  <PayPalButtons
                    style={{
                      color: 'black',
                      shape: 'rect',
                      label: 'paypal',
                      height: 50,
                    }}
                    createOrder={async (data, actions) => {
                      let order_id = await paypalCreateOrder()
                      return order_id + ''
                    }}
                    onApprove={async (data, actions): Promise<void> => {
                      await paypalCaptureOrder(data.orderID)
                    }}
                    disabled={selectedProductId == '' || isMissingContactInfo}
                  />
                </PayPalScriptProvider>
                {canUseApplePay ? (
                  <button
                    type="submit"
                    style={{ backgroundColor: 'black', maxHeight: '50px' }}
                    disabled={selectedProductId == '' || isMissingContactInfo}
                    onClick={handlePayWithApplePay}
                  >
                    <img
                      src="/images/button-pay-with@2x.png"
                      alt="Pay with Apple Pay"
                      style={{ height: 50 }}
                      className={selectedProductId == '' ? 'opacity-50 grayscale pointer-events-none' : ''}
                    />
                  </button>
                ) : null}
              </div>
              {error ? (
                <div className="mt-10 border-l-4 border-yellow-400 bg-yellow-50 p-4">
                  <div className="flex">
                    <div className="shrink-0">
                      <ExclamationTriangleIcon aria-hidden="true" className="size-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">{error}</p>
                    </div>
                    <div className="ml-auto pl-3">
                      <div className="-mx-1.5 -my-1.5">
                        <button
                          type="button"
                          className="inline-flex rounded-md bg-yellow-50 p-1.5 text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
                          onClick={() => setError('')}
                        >
                          <span className="sr-only">Dismiss</span>
                          <XMarkIcon aria-hidden="true" className="size-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {paymentCompleted ? (
                <div className="mt-10 rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <div className="shrink-0">
                      <CheckCircleIcon aria-hidden="true" className="size-5 text-green-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Order completed</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>
                          Continue to the{' '}
                          <a className="font-medium underline" href="/dashboard/schedule">
                            schedule
                          </a>{' '}
                          page to reserve your lessons. <strong>Parent and Tot</strong> lessons are automatically
                          scheduled.
                        </p>
                      </div>
                      <div className="mt-4">
                        <div className="-mx-2 -my-1.5 flex">
                          <button
                            type="button"
                            className="ml-3 rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                            onClick={() => setPaymentCompleted(false)}
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
