import { Button } from '@components/button'
import { Heading } from '@components/heading'
import type { Metadata } from 'next'
import ClientWrapper from './client-wrapper'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Schedules',
}

export default function SchedulesPage() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Schedules</Heading>
        </div>
        <Link href="/admin/schedules/schedule-builder">
          <Button>Schedule Builder</Button>
        </Link>
      </div>

      <ClientWrapper />
    </>
  )
}
