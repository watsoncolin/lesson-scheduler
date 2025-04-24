'use client'

import { Schedule } from '@lib/schedule'
import { useInstructors } from '@contexts/instructor-context'
import { usePools } from '@contexts/pools-context'
import { format } from 'date-fns'
import { useState, useEffect } from 'react'

interface SchedulesListProps {
  schedules: Schedule[]
}

export default function SchedulesList({ schedules }: SchedulesListProps) {
  const { instructors } = useInstructors()
  const { pools } = usePools()

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Instructor
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Pool
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Type
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Start Time
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    End Time
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Registrations
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {schedules.map(schedule => {
                  const instructor = instructors.find(i => i.id === schedule.instructorId)
                  const pool = pools.find(p => p.id === schedule.poolId)

                  return (
                    <tr key={schedule.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {instructor?.name ?? 'Unknown'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{pool?.name ?? 'Unknown'}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {schedule.lessonType === 'private' ? 'Private' : 'Group'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {format(new Date(schedule.startDateTime), 'MMM d, yyyy h:mm a')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {format(new Date(schedule.endDateTime), 'MMM d, yyyy h:mm a')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {schedule.registrations.length} / {schedule.classSize}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
