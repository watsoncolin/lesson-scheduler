import { useState } from 'react'
import { WaiverModal } from './waiver-modal'

export function SignWaiverButton({ onClose }: { onClose: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Sign Waiver
      </button>

      <WaiverModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          onClose()
        }}
      />
    </>
  )
}
