'use client'

import { useState } from 'react'
import { Button } from '@components/button'
import InstructorModal from './instructor-modal'

export default function InstructorModalWrapper() {
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
      <Button onClick={handleOpenModal}>Create instructor</Button>
      <InstructorModal isOpen={isModalOpen} onClose={handleCloseModal} onSuccess={handleSuccess} />
    </>
  )
}
