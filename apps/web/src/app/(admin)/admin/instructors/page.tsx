import { Button } from '@components/button'
import { Heading } from '@components/heading'
import { Input, InputGroup } from '@components/input'
import { Select } from '@components/select'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { get } from '@utils/api'
import { Instructor } from '@lib/instructor'
import InstructorsList from './instructors-list'
import InstructorModalWrapper from './instructor-modal-wrapper'

export const metadata: Metadata = {
  title: 'Instructors',
}

// Server-side data fetching
async function getInstructors() {
  try {
    const instructors = await get<Instructor[]>('/instructors')
    return instructors
  } catch (error) {
    console.error('Failed to fetch instructors:', error)
    return []
  }
}

export default async function InstructorsPage() {
  // Fetch instructors on the server
  const instructors = await getInstructors()

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Instructors</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search instructors&hellip;" />
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by">
                <option value="name">Sort by name</option>
                <option value="date">Sort by date</option>
                <option value="status">Sort by status</option>
              </Select>
            </div>
          </div>
        </div>
        <InstructorModalWrapper />
      </div>

      {/* Pass the server-fetched data to the client component */}
      <InstructorsList instructors={instructors} />
    </>
  )
}
