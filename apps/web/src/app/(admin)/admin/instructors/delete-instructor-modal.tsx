'use client'

import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react'
import { Button } from '@components/button'
import { InstructorService } from '@/services/api/shared/instructorService'
import { useState } from 'react'

interface DeleteInstructorModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  instructor: {
    id: string
    name: string
  }
}

export default function DeleteInstructorModal({ isOpen, onClose, onSuccess, instructor }: DeleteInstructorModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)

    try {
      await InstructorService.remove(instructor.id)
      onSuccess()
      onClose()
    } catch (err) {
      setError('Failed to delete instructor. Please try again.')
      console.error('Error deleting instructor:', err)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="mx-auto max-w-sm w-full rounded-lg bg-white p-8 dark:bg-zinc-900">
            <DialogTitle className="text-lg font-medium">Delete Instructor</DialogTitle>
            <div className="mt-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Are you sure you want to delete {instructor.name}? This action cannot be undone.
              </p>
              {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
              <div className="mt-6 flex justify-end gap-x-3">
                <Button onClick={onClose} plain>
                  Cancel
                </Button>
                <Button onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
