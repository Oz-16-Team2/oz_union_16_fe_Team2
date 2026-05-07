// - 특정 기간(start ~ end)의 잔디(달성률) 데이터를 조회
// - 캐싱 및 재요청 제어는 React Query가 담당
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { ApiErrorResponse } from '@/apis/api.types'
import { heatmapApi } from '@/apis/heatmap'
import type {
  HeatmapDetail,
  HeatmapRequestParams,
} from '@/features/my-page/heatmap/heatmap.api.types'
import { useAuthStore } from '@/store/authStore'

// staleTime: 3분 동안은 fresh 상태로 간주 (재요청 방지)
// - 같은 기간 데이터를 반복 조회할 때 불필요한 API 호출 줄이기
const HEATMAP_STALE_TIME = 3 * 60 * 1000

// useHeatmapQuery
// - params: { start, end } 기간을 기준으로 heatmap 데이터 요청
// - queryKey에 기간을 포함시켜 캐싱 분리
export function useHeatmapQuery(params: HeatmapRequestParams) {
  const accessToken = useAuthStore((state) => state.accessToken)
  const user = useAuthStore((state) => state.user)
  const userCacheKey = user?.id ?? user?.nickname ?? 'guest'

  return useQuery<HeatmapDetail, AxiosError<ApiErrorResponse>>({
    // - user/start/end 값이 바뀌면 다른 쿼리로 인식 (캐시 분리)
    queryKey: ['heatmap', userCacheKey, params.start, params.end],
    // - 실제 API 호출
    // - res.data.detail만 반환해서 UI에서 바로 사용 가능하게 정리
    queryFn: () => heatmapApi.getHeatmap(params).then((res) => res.data.detail),
    enabled: Boolean(accessToken && user),
    // - 지정 시간 동안은 데이터 재요청 없이 캐시 사용
    staleTime: HEATMAP_STALE_TIME,
  })
}
