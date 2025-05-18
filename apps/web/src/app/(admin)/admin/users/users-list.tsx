'use client'

import { useEffect, useState } from 'react'
import { Divider } from '@components/divider'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@components/dropdown'
import { Link } from '@components/link'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'
import { IUser, IPaginatedData } from '@lesson-scheduler/shared'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/table'
import { Button } from '@components/button'
import { Pagination } from '@components/pagination'
import { UserService } from '@/services/api/shared/userService'

export default function UsersList({
  searchQuery = '',
  sortBy = 'name',
  phone = '',
}: {
  searchQuery?: string
  sortBy?: string
  phone?: string
}) {
  const [users, setUsers] = useState<IUser[]>([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(1000)

  const totalPages = Math.ceil(total / limit)

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await UserService.findAll(currentPage, limit, searchQuery, phone)
      // The API returns data as any[][], but we expect IUser[]
      // If the first element is an array, flatten it; otherwise, use as is
      let users: IUser[] = []
      if (Array.isArray(response.data) && Array.isArray(response.data[0])) {
        users = response.data[0] as unknown as IUser[]
      } else if (Array.isArray(response.data)) {
        users = response.data as unknown as IUser[]
      }
      setUsers(users)
      setTotal(response.total)
    }
    fetchUsers()
  }, [currentPage, limit, searchQuery, sortBy, phone])

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
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
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
