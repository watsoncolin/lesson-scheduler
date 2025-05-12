import { Heading } from '@components/heading'
import { Input, InputGroup } from '@components/input'
import { Select } from '@components/select'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { PoolService } from '@/services/api/shared/poolService'
import PoolsList from './pools-list'
import PoolModalWrapper from './pool-modal-wrapper'

export const metadata: Metadata = {
  title: 'Pools',
}

export const revalidate = 3600 // Revalidate every hour

export default async function PoolsPage() {
  const pools = await PoolService.findAll()

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
