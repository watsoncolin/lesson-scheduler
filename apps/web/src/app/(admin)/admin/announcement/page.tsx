import { Heading } from '@components/heading'
import { Input, InputGroup } from '@components/input'
import { Select } from '@components/select'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import Announcement from './announcement'

export const metadata: Metadata = {
  title: 'Announcements',
}

export default async function AnnouncementPage() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Announcements</Heading>
        </div>
      </div>

      {/* Pass the server-fetched data to the client component */}
      <Announcement />
    </>
  )
}
