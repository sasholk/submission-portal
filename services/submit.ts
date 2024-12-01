import { formSchema } from '@/utils/validation/form'
import { z } from 'zod'
import { postAssignment } from './api'

export const transformZodErrors = async (error: z.ZodError) => {
  return error.issues.map(issue => ({
    path: issue.path.join('.'),
    message: issue.message,
  }))
}

export async function submitForm(formData: FormData) {
  try {
    const validatedFields = formSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      assignmentDescription: formData.get('assignmentDescription'),
      githubUrl: formData.get('githubUrl'),
      candidateLevel: formData.get('candidateLevel'),
    })

    const formattedFields = {
      name: validatedFields.name,
      email: validatedFields.email,
      assignment_description: validatedFields.assignmentDescription,
      github_repo_url: validatedFields.githubUrl,
      candidate_level: validatedFields.candidateLevel,
    }

    await postAssignment(formattedFields)

    // send validated data to database here
    return {
      errors: null,
      data: 'data received and mutated',
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        errors: transformZodErrors(error),
        data: null,
      }
    }

    return {
      errors: {
        message: 'An unexpected error occurred. Could not create shelf.',
      },
      data: null,
    }
  }
}
