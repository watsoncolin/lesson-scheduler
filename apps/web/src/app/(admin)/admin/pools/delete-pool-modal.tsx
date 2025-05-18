'use client'

import { useState } from 'react'
import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react'
import { Button } from '@components/button'
import { Pool } from '@lib/pool'
import { PoolService } from '@/services/api/shared/poolService'

interface DeletePoolModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  pool: Pool
}

export default function DeletePoolModal({ isOpen, onClose, onSuccess, pool }: DeletePoolModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)

    try {
      await PoolService.remove(pool.id)
      onSuccess()
      onClose()
    } catch (err) {
      setError('Failed to delete pool. Please try again.')
      console.error('Error deleting pool:', err)
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
            <DialogTitle className="text-lg font-medium">Delete Pool</DialogTitle>
            <div className="mt-4 space-y-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Are you sure you want to delete this pool? This action cannot be undone.
              </p>
              {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
              <div className="mt-6 flex justify-end gap-x-3">
                <Button onClick={onClose} plain>
                  Cancel
                </Button>
                <Button onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
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
