import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://tools.qa.public.ale.ai/api/tools',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Fetch candidate levels
export const getCandidateLevels = async () => {
  const response = await axiosInstance.get('/candidates/levels')
  return response.data
}

// Submit assignment
export const postAssignment = async (data: any) => {
  const response = await axiosInstance.post('/candidates/assignments', data)
  return response
}
