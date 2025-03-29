'use client'
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'

import { useState, useEffect, use } from 'react'

import { del, get, patch, post } from '../../utils/api'
import React from 'react'
import { Product, Schedule, Student } from '../../lib'
import { usePools, useInstructors, useUser } from '../../contexts'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

// Extend the Window interface to include ApplePaySession
declare global {
  interface Window {
    ApplePaySession?: any
  }
}

export default function Purchase() {
  const [products, setProducts] = useState([] as Product[])
  const [selectedProductId, setSelectedProductId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [canUseApplePay, setCanUseApplePay] = useState(false)
  const [selectedScheduleId, setSelectedScheduleId] = useState('')
  const [selectedStudentId, setSelectedStudentId] = useState('')
  const [students, setStudents] = useState([] as Student[])

  const [schedules, setSchedules] = useState([] as Schedule[])
  const { pools } = usePools()
  const { instructors } = useInstructors()
  const { user } = useUser()

  useEffect(() => {
    if (window.ApplePaySession && window.ApplePaySession.canMakePayments()) {
      setCanUseApplePay(true)
    }
  }, [])
  const fetchSchedules = async () => {
    try {
      const schedules = await get<Schedule[]>('/schedules/parent-tot')
      setSchedules(schedules)
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
    fetchSchedules()
  }, [])

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchProducts = async () => {
    try {
      const products = await get<Product[]>('/products')
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
    try {
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

      const response = await post('/payments/paypal-create-order', {
        productId: selectedProductId,
        userId: user?.id,
        paymentGateway: 'PAYPAL',
        quantity: selectedQuantity,
        scheduleId: selectedScheduleId || undefined,
        studentId: selectedStudentId || undefined,
      })
      return response.id
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    }
  }

  const paypalCaptureOrder = async (orderId: string): Promise<void> => {
    try {
      await post('/payments/paypal-capture-order', {
        orderId,
      })
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    }

    setPaymentCompleted(true)
  }

  const handlePayWithApplePay = async () => {
    console.log('pay with apple pay')
    const product = products.find(p => p.id == selectedProductId)
    const session = new window.ApplePaySession(3, {
      countryCode: 'US',
      currencyCode: 'USD',
      merchantCapabilities: ['supports3DS'],
      supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
      total: { label: 'Stansbury Swim', amount: product?.amount ?? 0 * quantity },
    })
    console.log(session)
    session.onvalidatemerchant = async (event: { validationURL: any }) => {
      const response = await post('/payments/apple-validate-merchant', {
        validationUrl: event.validationURL,
      })
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
                    className="relative mt-0.5 size-4 shrink-0 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
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
                    className="relative mt-0.5 size-4 shrink-0 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
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
                      >
                        <option>select a session</option>
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
                    disabled={selectedProductId == ''}
                  />
                </PayPalScriptProvider>
                {canUseApplePay ? (
                  <button
                    type="submit"
                    style={{ backgroundColor: 'black', maxHeight: '50px' }}
                    disabled={selectedProductId == ''}
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
