'use client'

import { useCandidateLevels } from '@/hooks/useCandidateLevels'
import { submitForm } from '@/services/submit'
import { FormFieldEnum } from '@/types/form'
import { formSchema, FormSchema } from '@/utils/validation/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { redirect } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import ErrorMessage from '../ui/ErrorMessage'
import FormField from './FormField'
import SelectField from './SelectField'

export default function AssignmentSubmissionForm() {
  // initialize the useForm hook with the Zod resolver and default values
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      assignmentDescription: '',
      githubUrl: '',
      candidateLevel: undefined,
    },
    mode: 'onBlur',
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
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
    formData.append('githubUrl', data.githubUrl)
    formData.append('candidateLevel', data.candidateLevel)

    // call the action
    const { data: success, errors: formError } = await submitForm(formData)

    if (formError) {
    }

    if (success) {
      redirect(`/thank-you`)
    }
  }

  return (
    <div className='bg-secondary shadow-custom shadow-pink-50 rounded-lg p-8 max-w-lg w-full text-background'>
      <h1 className='text-2xl font-bold mb-6'>Assignment Submission Form</h1>

      <ErrorMessage message={levelsError} />

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
          id={FormFieldEnum.GithubUrl}
          label='GitHub Repository URL'
          type='url'
          register={register}
          error={errors.githubUrl}
        />
        {isLevelsLoading ? (
          <p>Loading candidate levels...</p>
        ) : (
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
        )}

        <button
          disabled={isSubmitting}
          className='w-full bg-primary py-2 text-foreground px-4 rounded-md shadow-sm hover:bg-primary hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
        >
          {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
          {/* Submit Assignment */}
        </button>
      </form>
    </div>
  )
}
