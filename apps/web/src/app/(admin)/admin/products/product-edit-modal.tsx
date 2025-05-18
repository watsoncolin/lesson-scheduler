'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react'
import { Button } from '@components/button'
import { Input } from '@components/input'
import { ProductService } from '@/services/api/shared/productService'
import { IProduct } from '@lesson-scheduler/shared'

interface ProductEditModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  product: IProduct
}

export default function ProductEditModal({ isOpen, onClose, onSuccess, product }: ProductEditModalProps) {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    amount: product.amount,
    credits: product.credits,
    features: product.features,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    setFormData({
      name: product.name,
      description: product.description,
      amount: product.amount,
      credits: product.credits,
      features: product.features,
    })
  }, [product])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await ProductService.update(product.id, formData)
      onSuccess()
      onClose()
    } catch (err) {
      setError('Failed to update product. Please try again.')
      console.error('Error updating product:', err)
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
            <DialogTitle className="text-lg font-medium">Edit Product</DialogTitle>
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
              {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
              <div className="mt-6 flex justify-end gap-x-3">
                <Button onClick={onClose} plain>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || isUploading}>
                  {isSubmitting ? 'Updating...' : 'Update Product'}
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
