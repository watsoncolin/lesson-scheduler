'use client'

import { useState } from 'react'
import { Button } from '@components/button'
import ProductModal from './product-modal'

export default function ProductModalWrapper() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSuccess = () => {
    // Refresh the page to get the updated data
    window.location.reload()
  }

  return (
    <>
      <Button onClick={handleOpenModal}>Create product</Button>
      <ProductModal isOpen={isModalOpen} onClose={handleCloseModal} onSuccess={handleSuccess} />
    </>
  )
}
