import { postAssignment } from '@/services/api'
import { useMutation } from '@tanstack/react-query'

export const useSubmitAssignment = () => {
  return useMutation(postAssignment, {
    onError: (error: any) => {
      console.error('Submission error:', error.response?.data || error.message)
    },
    onSuccess: data => {
      console.log('Assignment submitted successfully:', data)
    },
  })
}
