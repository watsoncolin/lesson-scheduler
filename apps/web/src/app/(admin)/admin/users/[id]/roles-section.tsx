'use client'

import { Button } from '@/app/components/button'
import { patch, post } from '@/app/utils/api'
import { IInstructor, IUser, Role } from '@lesson-scheduler/shared'
import { useState } from 'react'

interface RolesSectionProps {
  user: IUser
  instructors: IInstructor[]
}

export function RolesSection({ user, instructors }: RolesSectionProps) {
  const [selectedInstructorId, setSelectedInstructorId] = useState<string>(user.instructorId || '')

  const assignInstructorRole = async () => {
    await patch(`/users/${user.id}`, { instructorId: selectedInstructorId, role: Role.Instructor })

    window.location.reload()
  }

  const removeInstructorRole = async () => {
    await patch(`/users/${user.id}`, { instructorId: null, role: Role.User })
    window.location.reload()
  }

  return (
    <div className="mt-4 space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Instructor Role</h3>
            <p className="mt-1 text-sm text-gray-500">
              Assign an instructor profile to this user to grant them instructor privileges.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <select
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={selectedInstructorId}
              onChange={e => setSelectedInstructorId(e.target.value)}
            >
              <option value="">Select an instructor</option>
              {instructors.map(instructor => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name}
                </option>
              ))}
            </select>

            {!user.instructorId && (
              <Button className="whitespace-nowrap" onClick={assignInstructorRole}>
                Assign Instructor Role
              </Button>
            )}
            {user.instructorId && (
              <Button className="whitespace-nowrap" onClick={removeInstructorRole}>
                Remove Instructor Role
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
