import { getCandidateLevels } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

/**
 * Custom hook to fetch and cache candidate levels.
 * @returns Object containing candidate levels, error message, and loading state.
 */
export const useCandidateLevels = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['candidateLevels'], // Unique cache key for the query
    queryFn: getCandidateLevels, // Fetching function
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    retry: 3, // Retry up to 3 times on failure
  })

  // Extract levels safely if the API response structure includes a `levels` property
  const levels = data?.levels || [] // Adjust according to actual API response

  return {
    levels,
    error: error ? 'Failed to load candidate levels.' : null,
    isLoading,
  }
}
