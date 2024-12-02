'use client'

import ErrorMessage from '@/components/ui/ErrorMessage'
import { useCandidateLevels } from '@/hooks/useCandidateLevels'
import { submitForm } from '@/services/submit'
import { FormFieldEnum } from '@/types/form'
import { formSchema, FormSchema } from '@/utils/validation/form'
import { zodResolver } from '@hookform/resolvers/zod'
import cn from 'classnames'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormField from '../FormField'
import SelectField from '../SelectField'

export default function AssignmentSubmissionForm() {
  const [formError, setFormError] = useState<string | null>(null)
  // initialize the useForm hook with the Zod resolver and default values
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      assignmentDescription: '',
      githubRepoUrl: '',
      candidateLevel: undefined,
    },
    mode: 'all',
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = form

  const {
    levels,
    error: levelsError,
    isLoading: isLevelsLoading,
  } = useCandidateLevels()

  const onSubmitForm: SubmitHandler<FormSchema> = async data => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('assignmentDescription', data.assignmentDescription)
    formData.append('githubRepoUrl', data.githubRepoUrl)
    formData.append('candidateLevel', data.candidateLevel)

    // call the action
    const { data: success, errors: submitError } = await submitForm(formData)

    if (submitError) {
      setFormError(
        Array.isArray(submitError)
          ? submitError[0].message
          : submitError.message
      )
    }

    if (success) {
      const queryParams = new URLSearchParams({
        name: data.name,
        email: data.email,
        assignmentDescription: data.assignmentDescription,
        githubRepoUrl: data.githubRepoUrl,
        candidateLevel: data.candidateLevel,
      }).toString()

      redirect(`/thank-you?${queryParams}`)
    }
  }

  const isDisabled = isSubmitting || !isValid || !isDirty

  return (
    <div className='bg-secondary shadow-custom shadow-pink-50 rounded-lg p-8 max-w-lg w-full text-background'>
      <h1 className='text-2xl font-bold mb-6'>Assignment Submission Form</h1>

      <ErrorMessage message={formError} />

      <form onSubmit={handleSubmit(onSubmitForm)} className='space-y-4'>
        <FormField
          id={FormFieldEnum.Name}
          label='Name'
          register={register}
          error={errors.name}
        />
        <FormField
          id={FormFieldEnum.Email}
          label='Email'
          type='email'
          register={register}
          error={errors.email}
        />
        <FormField
          id={FormFieldEnum.AssignmentDescription}
          label='Assignment Description'
          type='textarea'
          register={register}
          error={errors.assignmentDescription}
        />
        <FormField
          id={FormFieldEnum.githubRepoUrl}
          label='GitHub Repository URL'
          type='url'
          register={register}
          error={errors.githubRepoUrl}
        />
        {isLevelsLoading ? (
          <p>Loading candidate levels...</p>
        ) : (
          <>
            {(levelsError || !levels.length) && (
              <ErrorMessage
                message={levelsError || 'Error to fetch candidate levels'}
              />
            )}

            <SelectField
              id={FormFieldEnum.CandidateLevel}
              label='Candidate Level'
              options={levels.map((level: string) => ({
                value: level,
                label: level,
              }))}
              control={control}
              register={register}
              error={errors.candidateLevel}
            />
          </>
        )}

        <button
          disabled={isDisabled}
          className={cn(
            'w-full bg-primary py-2 text-foreground px-4 rounded-md shadow-sm  enabled:transition enabled:hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
            {
              'opacity-50 cursor-not-allowed': isDisabled,
            }
          )}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
        </button>
      </form>
    </div>
  )
}
