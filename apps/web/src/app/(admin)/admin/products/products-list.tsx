import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ProductModalWrapper } from './product-modal-wrapper'
import { DeleteProductModal } from './delete-product-modal'
import { api } from '@/lib/api'
import { IProduct } from '@lesson-scheduler/shared'

export function ProductsList() {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get('/products')
      return response.data
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left">Order</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Credits</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product: IProduct) => (
              <tr key={product.id} className="border-b">
                <td className="px-4 py-2">{product.order}</td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.lessonType}</td>
                <td className="px-4 py-2">{product.credits}</td>
                <td className="px-4 py-2">${product.amount}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      product.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedProduct(product)} className="text-blue-600 hover:text-blue-800">
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProduct(product)
                        setIsDeleteModalOpen(true)
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProduct && <ProductModalWrapper product={selectedProduct} onClose={() => setSelectedProduct(null)} />}

      {isDeleteModalOpen && selectedProduct && (
        <DeleteProductModal
          product={selectedProduct}
          onClose={() => {
            setIsDeleteModalOpen(false)
            setSelectedProduct(null)
          }}
        />
      )}
    </div>
  )
}
