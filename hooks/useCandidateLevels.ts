import { getCandidateLevels } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export const useCandidateLevels = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['candidateLevels'], // Cache key
    queryFn: getCandidateLevels, // Fetching function
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 3, // Retry 3 times on failure
  })

  // Safely extract levels if the API returns an object
  const levels = data?.levels || [] // Adjust this based on your actual API response structure

  return {
    levels,
    error: error ? 'Failed to load candidate levels.' : null,
    isLoading,
  }
}
