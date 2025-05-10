'use client'

import { Heading } from '@components/heading'
import { Input, InputGroup } from '@components/input'
import { Select } from '@components/select'
import { MagnifyingGlassIcon, PhoneIcon } from '@heroicons/react/16/solid'
import { Button } from '@components/button'
import { useState } from 'react'
import UsersList from './users-list'

export default function UsersPageClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [isSearching, setIsSearching] = useState(false)
  const [phone, setPhone] = useState('')

  const handleSearch = () => {
    setIsSearching(true)
  }

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Users</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input
                  name="search"
                  placeholder="Search users&hellip;"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
              </InputGroup>
            </div>
            <div className="flex-1">
              <InputGroup>
                <PhoneIcon />
                <Input
                  name="phone"
                  placeholder="Search by phone&hellip;"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
              </InputGroup>
            </div>
            <div>
              <Select name="sort_by" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="name">Sort by name</option>
                <option value="email">Sort by email</option>
              </Select>
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
      </div>

      {/* Pass the search parameters to the client component */}
      <UsersList searchQuery={searchQuery} sortBy={sortBy} phone={phone} />
    </>
  )
}
