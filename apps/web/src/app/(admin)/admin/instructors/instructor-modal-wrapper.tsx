'use client'

import { useState } from 'react'
import { Button } from '@components/button'
import InstructorModal from './instructor-modal'
import { Instructor } from '@lib/instructor'

interface InstructorModalWrapperProps {
  instructor?: Instructor
  buttonText?: string
  isOpen?: boolean
  onClose?: () => void
  onSuccess?: () => void
}

export default function InstructorModalWrapper({
  instructor,
  buttonText,
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  onSuccess: controlledOnSuccess,
}: InstructorModalWrapperProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    controlledOnClose?.()
  }

  const handleSuccess = () => {
    // Refresh the page to get the updated data
    window.location.reload()
    controlledOnSuccess?.()
  }

  // If controlled props are provided, use those instead of internal state
  const isOpen = controlledIsOpen ?? isModalOpen
  const onClose = controlledOnClose ?? handleCloseModal
  const onSuccess = controlledOnSuccess ?? handleSuccess

  return (
    <>
      {!controlledIsOpen && <Button onClick={handleOpenModal}>{buttonText || 'Create instructor'}</Button>}
      <InstructorModal isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} instructor={instructor} />
    </>
  )
}
