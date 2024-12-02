import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email({ message: 'Invalid email address' }),
  assignmentDescription: z.string().min(10, {
    message: 'Description must be at least 10 character',
  }),
  githubUrl: z
    .string()
    .url()
    .includes('github.com', { message: 'Invalid GitHub URL' }),
  candidateLevel: z.enum(['Junior', 'Middle', 'Senior', 'Principal'], {
    message: 'Invalid candidate level',
  }),
})

// inferred type can be used elsewhere in code to maintain type safety, ensuring that the data adheres to the schema’s rules.
export type FormSchema = z.infer<typeof formSchema>
