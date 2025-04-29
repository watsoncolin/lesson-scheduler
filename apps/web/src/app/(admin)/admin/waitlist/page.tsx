import { Heading } from '@components/heading'
import { Input, InputGroup } from '@components/input'
import { Select } from '@components/select'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import Waitlist from './waitlist'

export const metadata: Metadata = {
  title: 'Waitlist',
}

export default async function UsersPage() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Waitlist</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search users&hellip;" />
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by">
                <option value="name">Sort by name</option>
                <option value="email">Sort by email</option>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Pass the server-fetched data to the client component */}
      <Waitlist />
    </>
  )
}
