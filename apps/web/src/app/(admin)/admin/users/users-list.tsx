'use client'

import { useEffect, useState } from 'react'
import { Divider } from '@components/divider'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@components/dropdown'
import { Link } from '@components/link'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'
import { PaginatedResponseDto, UserSearchResponseDto } from '@lesson-scheduler/shared'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/table'
import { Button } from '@components/button'
import { Pagination } from '@components/pagination'
import { get } from '@/app/utils/api'

export default function UsersList() {
  const [users, setUsers] = useState<UserSearchResponseDto[]>([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(1000)

  const totalPages = Math.ceil(total / limit)

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await get<PaginatedResponseDto<UserSearchResponseDto>>(
        `/users?page=${currentPage}&limit=${limit}`,
      )
      setUsers(response.data)
      setTotal(response.total)
    }
    fetchUsers()
  }, [currentPage, limit])

  return (
    <>
      <ul className="mt-10">
        <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Phone</TableHeader>
              <TableHeader>Students</TableHeader>
              <TableHeader>Unused credits</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id} title={`User #${user.id}`} href={`/admin/users/${user.id}`}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.students.length}</TableCell>
                <TableCell>{user.unusedCredits}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ul>
      <div className="mt-8">
        <Pagination />
      </div>
    </>
  )
}
