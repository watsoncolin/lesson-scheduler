'use client'

import { useState, useEffect, useMemo } from 'react'
import { Schedule } from '@lib/schedule'
import SchedulesList from './schedules-list'
import Filter from './filter'
import { get } from '@utils/api'
import { Button } from '@components/button'

const ITEMS_PER_PAGE = 150

export default function ClientWrapper() {
  const [selectedInstructor, setSelectedInstructor] = useState('')
  const [selectedPool, setSelectedPool] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchSchedules = async () => {
    try {
      const data = await get<Schedule[]>('/schedules')
      setSchedules(data)
    } catch (error) {
      console.error('Failed to fetch schedules:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSchedules()
  }, [])

  // Filter schedules based on selected filters
  const filteredSchedules = useMemo(() => {
    return schedules.filter(schedule => {
      // Filter by pool
      if (selectedPool && schedule.poolId !== selectedPool) {
        return false
      }

      // Filter by instructor
      if (selectedInstructor && schedule.instructorId !== selectedInstructor) {
        return false
      }

      // Filter by date - only apply if a date is selected
      if (selectedDate) {
        const scheduleDate = new Date(schedule.startDateTime).toISOString().split('T')[0]
        if (scheduleDate !== selectedDate) {
          return false
        }
      }

      return true
    })
  }, [schedules, selectedPool, selectedInstructor, selectedDate])

  // Calculate pagination
  const totalPages = Math.ceil(filteredSchedules.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE

  const paginatedSchedules = filteredSchedules.slice(startIndex, endIndex)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedPool, selectedInstructor, selectedDate])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="mt-6">
        <Filter
          onInstructorChange={setSelectedInstructor}
          onPoolChange={setSelectedPool}
          onDateChange={setSelectedDate}
          selectedInstructor={selectedInstructor}
          selectedPool={selectedPool}
          selectedDate={selectedDate}
        />
      </div>

      <SchedulesList schedules={paginatedSchedules} onDelete={fetchSchedules} />

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredSchedules.length)} of {filteredSchedules.length}{' '}
            results
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1}>
              Previous
            </Button>
            <Button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
