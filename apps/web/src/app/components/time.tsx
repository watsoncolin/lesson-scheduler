'use client'
import { useState, useEffect } from 'react'
import { formatDateTime } from '@/app/utils/dates'

export default function Time({ dateTime }: { dateTime: string }) {
  const [timeString, setTimeString] = useState<string | null>(null)

  useEffect(() => {
    const parts = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' }).formatToParts(new Date())
    const tzPart = parts.find(part => part.type === 'timeZoneName')

    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }

    if (tzPart && tzPart.value !== 'MDT') {
      options.timeZoneName = 'short'
    }

    setTimeString(formatDateTime(dateTime))
  }, [dateTime])

  return <time dateTime={dateTime}>{timeString}</time>
}
