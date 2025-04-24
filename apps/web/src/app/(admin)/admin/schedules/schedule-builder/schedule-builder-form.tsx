'use client'

import { useState } from 'react'
import { Select } from '@components/select'
import { useInstructors } from '@contexts/instructor-context'
import { usePools } from '@contexts/pools-context'
import { format } from 'date-fns'

export default function ScheduleBuilderForm() {
  const { instructors } = useInstructors()
  const { pools } = usePools()
  const [selectedPool, setSelectedPool] = useState('')
  const [selectedInstructor, setSelectedInstructor] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const instructorOptions = instructors.map(instructor => ({
    value: instructor.id,
    label: instructor.name,
  }))

  const poolOptions = pools.map(pool => ({
    value: pool.id,
    label: pool.name,
  }))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div>
          <label htmlFor="pool" className="block text-sm font-medium text-gray-700">
            Pool
          </label>
          <Select
            id="pool"
            value={selectedPool}
            onChange={e => setSelectedPool(e.target.value)}
            options={poolOptions}
            placeholder="Select a pool"
          />
        </div>

        <div>
          <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">
            Instructor
          </label>
          <Select
            id="instructor"
            value={selectedInstructor}
            onChange={e => setSelectedInstructor(e.target.value)}
            options={instructorOptions}
            placeholder="Select an instructor"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  )
}
