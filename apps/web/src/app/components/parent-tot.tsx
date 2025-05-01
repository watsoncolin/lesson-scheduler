'use client'
import React, { use, useEffect, useState } from 'react'
import { useInstructors, usePools } from '@contexts/index'
import { Schedule } from '@lib/schedule'
import { get } from '@utils/api'
import { Announcement } from '@lesson-scheduler/shared'

export default function ParentTot() {
  const [schedules, setSchedules] = useState([] as Schedule[])
  const { pools } = usePools()
  const { instructors } = useInstructors()

  const fetchSchedules = async () => {
    try {
      const schedules = await get<Schedule[]>('/schedules/parent-tot')
      setSchedules(schedules)
    } catch (err: any) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchSchedules()
  }, [])

  const [announcement, setAnnouncement] = useState<Announcement | null>(null)
  useEffect(() => {
    const fetchAnnouncement = async () => {
      const response = await get('/announcement')
      setAnnouncement(response as Announcement)
    }
    try {
      fetchAnnouncement()
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <div id="announcement" className="bg-white py-12 md:py-10 lg:py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{announcement?.heading}</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">{announcement?.content}</p>
        </div>
        {/* 
        <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
          {schedules
            ? schedules.map(schedule => {
                const instructor = instructors.find(instructor => instructor.id === schedule.instructorId)
                const pool = pools.find(pool => pool.id === schedule.poolId)
                const name = `${instructor?.name ?? 'Private instructor'} at ${pool?.name}`
                const options: Intl.DateTimeFormatOptions = {
                  month: 'long', // 'January'
                  day: 'numeric', // '27'
                  hour: 'numeric', // '12 PM'
                  minute: 'numeric', // '30'
                }
                const startDateTime = new Date(schedule.startDateTime)
                const endDateTime = new Date(schedule.endDateTime)

                return (
                  <li
                    key={schedule.id}
                    className="group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100"
                  >
                    <a href="/dashboard/purchase" className="flex-auto">
                      <img src={instructor?.imageUrl} alt="" className="h-10 w-10 flex-none rounded-full" />
                      <div className="flex-auto">
                        <p className="text-gray-900">{name}</p>
                        <p className="mt-0.5">
                          <time dateTime={startDateTime.toISOString()}>
                            {startDateTime.toLocaleString('en-US', options)}
                          </time>
                          -{' '}
                          <time dateTime={endDateTime.toISOString()}>
                            {endDateTime.toLocaleString('en-US', options)}
                          </time>
                        </p>
                        <p className="mt-0.5">{schedule.spotsAvailable} spots left</p>
                      </div>
                    </a>
                  </li>
                )
              })
            : null}
        </ol> */}
      </div>
    </div>
  )
}
