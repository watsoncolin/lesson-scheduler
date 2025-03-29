'use client'
import { useState, useEffect } from 'react'
import React from 'react'
import { useUser } from '../../contexts'

export default function Admin() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { user } = useUser()
  if (user?.role !== 'admin') {
    return <div>Unauthorized</div>
  }

  return (
    <>
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Users</h1>
          </div>
        </header>
        <main className="px-6">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-10">
            <div>
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-gray-900">Admin</h1>
                  <p className="mt-2 text-sm text-gray-700">Manage the system.</p>
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
