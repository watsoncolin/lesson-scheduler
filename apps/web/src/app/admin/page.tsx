'use client'
import { useState } from 'react'
import React from 'react'
import { useUser } from '../contexts'

export default function Admin() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Admin</h1>
          </div>
        </header>
        <main className="px-6">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-10">
            <div>
              <div className="sm:flex sm:items-center">
                <div className="py-5">
                  {/* <h3 className="text-base font-semibold leading-6 text-gray-900">Credit balances</h3> */}
                  <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {[
                      { name: 'Private lesson credits purchased', stat: 1302 },
                      { name: 'Group lesson credits purchased', stat: 55 },
                      { name: 'Purchased and unscheduled', stat: 321 },
                      { name: 'Total available lessons', stat: 63 },
                      { name: 'Active users', stat: 175 },
                    ].map(item => (
                      <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              <div className="mt-8 flow-root"></div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
