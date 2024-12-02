import PostPreview from '@/components/shared/PostPreview'
import { BackButton } from '@/components/ui/BackButton'

export default function ThankYouPage() {
  return (
    <div className='flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] w-fit mx-auto'>
      <BackButton />

      <h1 className='text-4xl text-center'>Thank you for your submission!</h1>

      <p className='text-2xl'>We sent this data to server🥳</p>

      <PostPreview />
    </div>
  )
}
