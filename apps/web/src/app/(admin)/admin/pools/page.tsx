import { Heading } from '@components/heading'
import { Input, InputGroup } from '@components/input'
import { Select } from '@components/select'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { get } from '@utils/api'
import { IPool } from '@lesson-scheduler/shared'
import PoolsList from './pools-list'
import PoolModalWrapper from './pool-modal-wrapper'

export const metadata: Metadata = {
  title: 'Pools',
}

// Server-side data fetching
async function getPools() {
  try {
    const pools = await get<IPool[]>('/pools')
    return pools
  } catch (error) {
    console.error('Failed to fetch pools:', error)
    return []
  }
}

export default async function PoolsPage() {
  // Fetch pools on the server
  const pools = await getPools()

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Pools</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search pools&hellip;" />
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by">
                <option value="name">Sort by name</option>
                <option value="address">Sort by address</option>
                <option value="status">Sort by status</option>
              </Select>
            </div>
          </div>
        </div>
        <PoolModalWrapper />
      </div>

      {/* Pass the server-fetched data to the client component */}
      <PoolsList pools={pools} />
    </>
  )
}
