import axios, { AxiosInstance, AxiosResponse } from 'axios'

/**
 * Axios instance for API communication.
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://tools.qa.public.ale.ai/api/tools',
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Fetches candidate levels from the API.
 * This function is optimized for use with TanStack Query.
 *
 * @returns A promise resolving to the candidate levels data.
 * @throws An error if the request fails.
 */
export const getCandidateLevels = async (): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axiosInstance.get(
      '/candidates/levels'
    )
    return response.data
  } catch (error) {
    // Log the error or send it to an error-tracking service
    console.error('Failed to fetch candidate levels:', error)
    throw error
  }
}

/**
 * Submits an assignment to the API.
 * This function handles error scenarios and returns the server response.
 *
 * @param data - FormData object containing the assignment data.
 * @returns A promise resolving to the Axios response object.
 * @throws An error if the request fails.
 */
export const postAssignment = async (
  data: FormData
): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await axiosInstance.post(
      '/candidates/assignments',
      data
    )
    return response
  } catch (error) {
    // Handle the error and provide meaningful feedback
    console.error('Failed to submit assignment:', error)
    throw error // Allow the calling function to decide how to handle this error
  }
}
