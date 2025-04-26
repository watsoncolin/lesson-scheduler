import { useState } from 'react'
import { ProductModal } from './product-modal'
import { IProduct } from '@lesson-scheduler/shared'

interface ProductModalWrapperProps {
  product?: IProduct
  onClose?: () => void
}

export function ProductModalWrapper({ product, onClose }: ProductModalWrapperProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
    onClose?.()
  }

  return (
    <>
      {!product && (
        <button onClick={() => setIsOpen(true)} className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
          Add Product
        </button>
      )}

      {(isOpen || product) && <ProductModal product={product} onClose={handleClose} />}
    </>
  )
}
