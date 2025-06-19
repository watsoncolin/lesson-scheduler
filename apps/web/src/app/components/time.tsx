'use client'
import { useState, useEffect } from 'react'

export function formatDateTime(dateTime: string) {
  const date = new Date(dateTime)
  const options: Intl.DateTimeFormatOptions = {
    month: 'long', // 'January'
    day: 'numeric', // '27'
    hour: 'numeric', // '12 PM'
    minute: 'numeric', // '30'
  }
  return date.toLocaleString('en-US', options)
}

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

    const date = new Date(dateTime)
    setTimeString(date.toLocaleString('en-US', options))
  }, [dateTime])

  return <time dateTime={dateTime}>{timeString}</time>
}
