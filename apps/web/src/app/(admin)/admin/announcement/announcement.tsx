'use client'

import { useEffect, useState } from 'react'
import { AnnouncementService } from '@/services/api/shared/announcementService'
import { Button } from '@components/button'
import { Input } from '@components/input'
import { Textarea } from '@components/textarea'
import { CreateAnnouncementDto } from '@/api'

export default function AnnouncementList() {
  const [announcement, setAnnouncement] = useState<CreateAnnouncementDto | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState<CreateAnnouncementDto>({ title: '', heading: '', content: '' })

  useEffect(() => {
    const fetchAnnouncement = async () => {
      const response = await AnnouncementService.findOne()
      if (response) {
        setAnnouncement(response)
        setForm(response)
      }
    }
    fetchAnnouncement()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await AnnouncementService.create(form)
      setIsEditing(false)
      const response = await AnnouncementService.findOne()
      if (response) setAnnouncement(response)
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
                <Button
                  onClick={() => {
                    setIsEditing(true)
                    setForm(announcement)
                  }}
                >
                  Edit
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Create Announcement</Button>
            )}
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <Input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="mt-1"
                placeholder="Enter announcement title"
              />
            </div>
            <div>
              <label htmlFor="heading" className="block text-sm font-medium text-gray-700">
                Heading
              </label>
              <Input
                id="heading"
                name="heading"
                value={form.heading}
                onChange={handleChange}
                className="mt-1"
                placeholder="Enter announcement heading"
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <Textarea
                id="content"
                name="content"
                value={form.content}
                onChange={handleChange}
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
