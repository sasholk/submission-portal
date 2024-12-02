'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

export function PostPreview() {
  const searchParams = useSearchParams()

  const name = searchParams.get('name')
  const email = searchParams.get('email')
  const assignmentDescription = searchParams.get('assignmentDescription')
  const githubRepoUrl = searchParams.get('githubRepoUrl')
  const candidateLevel = searchParams.get('candidateLevel')

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <pre className='rounded-md bg-foreground text-background p-4'>
        <code>
          Name: {name}
          <br />
          Email: {email}
          <br />
          Assignment Description: {assignmentDescription}
          <br />
          GitHub Repo URL: {githubRepoUrl}
          <br />
          Candidate Level: {candidateLevel}
        </code>
      </pre>
    </Suspense>
  )
}

export default PostPreview
