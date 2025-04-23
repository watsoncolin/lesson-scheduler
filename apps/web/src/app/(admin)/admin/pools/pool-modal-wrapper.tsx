'use client'

import { useState } from 'react'
import { Button } from '@components/button'
import PoolModal from './pool-modal'

export default function PoolModalWrapper() {
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
      <Button onClick={handleOpenModal}>Create pool</Button>
      <PoolModal isOpen={isModalOpen} onClose={handleCloseModal} onSuccess={handleSuccess} />
    </>
  )
}
