import { useQuery } from '@tanstack/react-query'

import { authApi } from '@/apis/auth'
import { toProfileAvatarOptions } from '@/shared/profileAvatar'

type UseProfileImagesQueryOptions = {
  enabled?: boolean
}

export function useProfileImagesQuery(options?: UseProfileImagesQueryOptions) {
  return useQuery({
    queryKey: ['profileImages'],
    queryFn: async () => {
      const response = await authApi.getProfileImages()
      return toProfileAvatarOptions(response.detail)
    },
    enabled: options?.enabled ?? true,
    staleTime: 1000 * 60 * 10,
  })
}
