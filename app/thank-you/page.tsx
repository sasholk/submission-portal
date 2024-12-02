'use client'

import { BackButton } from '@/components/ui/BackButton'
import { useSearchParams } from 'next/navigation'

export default function Home() {
  const searchParams = useSearchParams()

  const name = searchParams.get('name')
  const email = searchParams.get('email')
  const assignmentDescription = searchParams.get('assignmentDescription')
  const githubRepoUrl = searchParams.get('githubRepoUrl')
  const candidateLevel = searchParams.get('candidateLevel')

  return (
    <div className='flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] w-fit mx-auto'>
      <BackButton />

      <h1 className='text-4xl text-center'>Thank you for your submission!</h1>

      <p className='text-2xl'>We sent this data to server🥳</p>

      <pre className='rounded-md bg-foreground text-background p-4'>
        <code>
          Name: {name}
          {'\n'}
          Email: {email}
          {'\n'}
          Assignment Description: {assignmentDescription}
          {'\n'}
          GitHub URL: {githubRepoUrl}
          {'\n'}
          Candidate Level: {candidateLevel}
        </code>
      </pre>
    </div>
  )
}
