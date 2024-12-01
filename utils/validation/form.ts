import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email({ message: 'Invalid email address' }),
  assignmentDescription: z.string().min(1, {
    message: 'Description must be at least 1 character',
  }),
  githubUrl: z
    .string({ message: 'GitHub is required' })
    .url({ message: 'Invalid URL' }),
  candidateLevel: z.string({ message: 'Select your level' }),
})

// inferred type can be used elsewhere in code to maintain type safety, ensuring that the data adheres to the schema’s rules.
export type FormSchema = z.infer<typeof formSchema>
