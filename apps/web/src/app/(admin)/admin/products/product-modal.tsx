'use client'

import { useState } from 'react'
import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react'
import { Button } from '@components/button'
import { Input } from '@components/input'
import { ProductService } from '@/services/api/shared/productService'

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function ProductModal({ isOpen, onClose, onSuccess }: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: 0,
    credits: 0,
    lessonType: '',
    order: 0,
    features: ['Personal Instructor', 'Warm Waters', 'Flexible Scheduling'],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await ProductService.create(formData)
      onSuccess()
      onClose()
    } catch (err) {
      setError('Failed to create product. Please try again.')
      console.error('Error creating product:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="mx-auto max-w-4xl w-full rounded-lg bg-white p-8 dark:bg-zinc-900">
            <DialogTitle className="text-lg font-medium">Add New Product</DialogTitle>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  placeholder="Product Name"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Description
                </label>
                <Input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  placeholder="Product Description"
                />
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Amount
                </label>
                <Input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  placeholder="Product Amount"
                />
              </div>
              <div>
                <label htmlFor="credits" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Credits
                </label>
                <Input
                  type="number"
                  id="credits"
                  name="credits"
                  value={formData.credits}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  placeholder="Product Credits"
                />
              </div>
              <div>
                <label htmlFor="lessonType" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Lesson Type
                </label>
                <Input
                  type="text"
                  id="lessonType"
                  name="lessonType"
                  value={formData.lessonType}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  placeholder="Product Lesson Type"
                />
              </div>
              <div>
                <label htmlFor="order" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Order
                </label>
                <Input
                  type="number"
                  id="order"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  placeholder="Product Order"
                />
              </div>
              {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
              <div className="mt-6 flex justify-end gap-x-3">
                <Button onClick={onClose} plain>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create Product'}
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
