import axios from 'axios'

// Create a reusable Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://tools.qa.public.ale.ai/api/tools',
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Fetches candidate levels from the API.
 * @returns A promise resolving to the data from the API.
 */
export const getCandidateLevels = async () => {
  const response = await axiosInstance.get('/candidates/levels')
  return response.data // Assuming the API response contains a `levels` property
}

/**
 * Submits an assignment to the API.
 * @param data - FormData object containing the assignment data.
 * @returns The Axios response object.
 */
export const postAssignment = async (data: FormData) => {
  const response = await axiosInstance.post('/candidates/assignments', data)
  return response
}
