'use client'

import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/table'
import { Pagination } from '@components/pagination'
import { WaitlistResponseDto } from '@/api/models/WaitlistResponseDto'
import { ConfigService } from '@/services/api/shared/configService'
import { SiteConfigService } from '@/api/services/SiteConfigService'
import { WaitlistService } from '@/api/services/WaitlistService'
import { Button } from '@components/button'

export default function WaitlistList() {
  const [waitlist, setWaitlist] = useState<WaitlistResponseDto[]>([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [waitlistEnabled, setWaitlistEnabled] = useState(false)

  useEffect(() => {
    const fetchConfig = async () => {
      const response = await ConfigService.findOne()
      setWaitlistEnabled(response.waitlistEnabled)
    }
    fetchConfig()
  }, [])
  const fetchWaitlist = async () => {
    const response = await WaitlistService.waitlistControllerFindAll()
    setWaitlist(response)
  }
  useEffect(() => {
    fetchWaitlist()
  }, [])

  const toggleWaitlist = async () => {
    await SiteConfigService.siteConfigControllerToggleWaitlist()
    const response = await ConfigService.findOne()
    setWaitlistEnabled(response.waitlistEnabled)
  }

  const allowPurchase = async (userId: string) => {
    await WaitlistService.waitlistControllerUpdate(userId)
    fetchWaitlist()
  }

  return (
    <>
      <ul className="mt-10">
        <div className="flex items-center gap-4">
          <span>Waitlist is currently {waitlistEnabled ? 'enabled' : 'disabled'}</span>
          <Button onClick={toggleWaitlist}>{waitlistEnabled ? 'Disable' : 'Enable'}</Button>
        </div>
        <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Phone</TableHeader>
              <TableHeader>Allowed</TableHeader>
              <TableHeader>Allowed on</TableHeader>
              <TableHeader>Created at</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {waitlist.map(user => (
              <TableRow key={user.id} title={`User #${user.id}`} href={`/admin/users/${user.id}`}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.allowed ? 'Yes' : 'No'}</TableCell>
                <TableCell>{user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : ''}</TableCell>
                <TableCell>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}</TableCell>
                <TableCell>
                  <Button disabled={user.allowed} onClick={() => allowPurchase(user.userId)}>
                    {user.allowed ? 'Allowed' : 'Allow purchase'}
                  </Button>
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
