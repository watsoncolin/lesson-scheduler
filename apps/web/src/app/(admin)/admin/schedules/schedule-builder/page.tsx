import { Heading } from '@components/heading'
import type { Metadata } from 'next'
import ScheduleBuilderForm from './schedule-builder-form'

export const metadata: Metadata = {
  title: 'Schedule Builder',
}

export default function ScheduleBuilderPage() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Schedule Builder</Heading>
        </div>
      </div>

      <div className="mt-6">
        <ScheduleBuilderForm />
      </div>
    </>
  )
}
