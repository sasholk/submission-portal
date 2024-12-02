import { formSchema } from '@/utils/validation/form'
import { z } from 'zod'
import { postAssignment } from './api'

/**
 * Transforms Zod validation errors into a more readable format.
 * @param error - The ZodError object containing validation issues.
 * @returns Array of formatted error objects with path and message.
 */
export const transformZodErrors = (error: z.ZodError) => {
  return error.issues.map(issue => ({
    path: issue.path.join('.'), // Combine path array into a string
    message: issue.message, // Human-readable error message
  }))
}

/**
 * Submits the form data after validation and transformation.
 * @param formData - The FormData object from the form submission.
 * @returns An object containing either errors or success data.
 */
export async function submitForm(formData: FormData) {
  try {
    // Validate form data using Zod schema
    const validatedFields = formSchema.parse({
      name: formData.get('name')?.toString(),
      email: formData.get('email')?.toString(),
      assignmentDescription: formData.get('assignmentDescription')?.toString(),
      githubUrl: formData.get('githubUrl')?.toString(),
      candidateLevel: formData.get('candidateLevel')?.toString(),
    })

    // Transform validated fields into the required API format
    const formattedFields = {
      name: validatedFields.name,
      email: validatedFields.email,
      assignment_description: validatedFields.assignmentDescription,
      github_repo_url: validatedFields.githubUrl,
      candidate_level: validatedFields.candidateLevel,
    }

    // Convert transformed data into FormData for the API call
    const formDataToSend = new FormData()
    Object.entries(formattedFields).forEach(([key, value]) => {
      if (value !== undefined) formDataToSend.append(key, value)
    })

    // Send data to the API
    await postAssignment(formDataToSend)

    // Return success response
    return {
      errors: null,
      data: 'Data received and processed successfully.',
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle Zod validation errors
      return {
        errors: transformZodErrors(error),
        data: null,
      }
    }

    // Handle unexpected errors
    return {
      errors: {
        message: 'An unexpected error occurred. Please try again later.',
      },
      data: null,
    }
  }
}
