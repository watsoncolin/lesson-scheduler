'use client'

import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/table'
import { Pagination } from '@components/pagination'
import { Waitlist } from '@lesson-scheduler/shared'
import { get, patch, post } from '@/app/utils/api'
import { Button } from '@components/button'
import { Announcement } from '@lesson-scheduler/shared'
import { Input } from '@components/input'
import { Textarea } from '@components/textarea'
import { useForm } from 'react-hook-form'

export default function AnnouncementList() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const { register, handleSubmit, reset } = useForm<Announcement>()

  useEffect(() => {
    const fetchAnnouncement = async () => {
      const response = (await get('/announcement')) as Announcement
      setAnnouncement(response)
      reset(response)
    }
    fetchAnnouncement()
  }, [reset])

  const onSubmit = async (data: Announcement) => {
    try {
      await post('/announcement', data)
      setIsEditing(false)
      const response = await get<{
        announcement: Announcement
      }>('/announcement')
      setAnnouncement(response.announcement)
    } catch (error) {
      console.error('Failed to save announcement:', error)
    }
  }

  return (
    <>
      <div className="mt-10">
        {!isEditing ? (
          <div className="flex items-center gap-4">
            {announcement ? (
              <>
                <span>
                  Announcement is currently <strong>{announcement?.title}</strong>
                </span>
                <Button onClick={() => setIsEditing(true)}>Edit</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Create Announcement</Button>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <Input id="title" {...register('title')} className="mt-1" placeholder="Enter announcement title" />
            </div>
            <div>
              <label htmlFor="heading" className="block text-sm font-medium text-gray-700">
                Heading
              </label>
              <Input id="heading" {...register('heading')} className="mt-1" placeholder="Enter announcement heading" />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <Textarea
                id="content"
                {...register('content')}
                className="mt-1"
                placeholder="Enter announcement content"
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Save</Button>
              <Button outline onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  )
}
