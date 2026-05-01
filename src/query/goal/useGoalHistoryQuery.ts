// - 특정 날짜 기준으로 목표 기록을 페이지네이션 형태로 조회
// - React Query를 이용해 캐싱 및 상태 관리 수행
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { goalApi } from '@/apis/goal'
import type {
  ApiGoalHistoryParams,
  ApiGoalHistoryResponse,
} from '@/features/my-page/goal/goal.api.types'

// - params: { date, page, size } 기준으로 목표 히스토리 조회
// - enabled: 쿼리 실행 여부 제어 (조건부 fetch)
export function useGoalHistoryQuery(
  params: ApiGoalHistoryParams,
  enabled = true
) {
  return useQuery<ApiGoalHistoryResponse>({
    // - date, page, size 값이 바뀌면 새로운 쿼리로 인식 (캐시 분리)
    queryKey: ['goal-history', params.date, params.page, params.size],

    // - 실제 API 호출
    // - res.data만 반환해서 UI에서 바로 사용 가능하게 처리
    queryFn: () => goalApi.getGoalHistory(params).then((res) => res.data),

    // - 페이지 변경 시 이전 데이터를 유지해서 UI 깜빡임 방지
    // - 로딩 중에도 기존 데이터 유지됨
    placeholderData: keepPreviousData,

    // - false일 경우 쿼리 실행 안함 (조건부 요청 제어)
    enabled,
  })
}
