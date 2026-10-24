import { useQuery } from '@tanstack/react-query'
import { getHealth } from '../lib/api/health.js'

export function useApiHealth() {
  return useQuery({
    queryKey: ['health'],
    queryFn: ({ signal }) => getHealth({ signal }),
    retry: false,
    refetchInterval: 30_000,
    staleTime: 15_000,
  })
}
