'use client'

import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
  className?: string
}

export function BackButton({}: Props) {
  const router = useRouter()

  return (
    <button
      className='flex gap-2 rounded-md bg-primary p-2 text-cream hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary w-fit'
      type='button'
      onClick={() => router.back()}
    >
      <MoveLeft />
      Go back
    </button>
  )
}
