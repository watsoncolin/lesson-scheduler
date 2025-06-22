'use client'

import { useEffect, useState } from 'react'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@components/dropdown'
import { Link } from '@components/link'
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'
import { IUser, IPaginatedData } from '@lesson-scheduler/shared'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/table'
import { Pagination } from '@components/pagination'
import { UserService } from '@/services/api/shared/userService'
import { AuthenticationService } from '@/api'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()

  const totalPages = Math.ceil(total / limit)

  const handleImpersonate = async (userId: string) => {
    try {
      const adminUser = localStorage.getItem('user')
      localStorage.setItem('adminUser', adminUser ?? '')

      // Call the impersonation endpoint
      const response = await AuthenticationService.authenticationControllerImpersonate({ userId })
      console.log('impersonate response', response)
      if (response.accessToken) {
        localStorage.setItem('user', JSON.stringify(response))
        // Redirect to user's dashboard
        window.location.href = '/dashboard'
      }
    } catch (error) {
      console.error('Failed to impersonate user:', error)
      // Handle error (e.g., show a notification)
    }
  }

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
              <TableHeader></TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link href={`/admin/users/${user.id}`}>
                    {user.firstName} {user.lastName}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.students.length}</TableCell>
                <TableCell>{user.unusedCredits}</TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownButton plain>
                      <EllipsisVerticalIcon />
                    </DropdownButton>
                    <DropdownMenu>
                      <DropdownItem onClick={() => handleImpersonate(user.id)}>Impersonate</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
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
