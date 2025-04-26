import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { IProduct } from '@lesson-scheduler/shared'

interface DeleteProductModalProps {
  product: IProduct
  onClose: () => void
}

export function DeleteProductModal({ product, onClose }: DeleteProductModalProps) {
  const queryClient = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await api.delete(`/products/${product.id}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      onClose()
    },
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Delete Product</h2>
        <p className="mb-4">
          Are you sure you want to delete the product "{product.name}"? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200">
            Cancel
          </button>
          <button
            onClick={() => deleteMutation.mutate()}
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
            disabled={deleteMutation.isPending}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
