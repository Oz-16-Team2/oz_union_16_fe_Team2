import { delay, http, HttpResponse } from 'msw'

import { toMswApiUrl } from '@/apis/apiPath'
import { RANKING_ENDPOINTS } from '@/apis/ranking'

import {
  mockMonthlyRankings,
  mockTotalRankings,
  mockWeeklyRankings,
} from '../data/ranking'

export const rankingHandler = [
  // GET /api/v1/statics/rankings/:rankingType
  http.get(
    toMswApiUrl(RANKING_ENDPOINTS.rankingPattern),
    async ({ params }) => {
      await delay(400)

      const { rankingType } = params

      if (rankingType === 'weekly') {
        return HttpResponse.json(
          { detail: { rankings: mockWeeklyRankings } },
          { status: 200 }
        )
      }

      if (rankingType === 'monthly') {
        return HttpResponse.json(
          { detail: { rankings: mockMonthlyRankings } },
          { status: 200 }
        )
      }

      if (rankingType === 'total') {
        return HttpResponse.json(
          { detail: { rankings: mockTotalRankings } },
          { status: 200 }
        )
      }

      return HttpResponse.json(
        { error_detail: '요청 값이 올바르지 않습니다.' },
        { status: 400 }
      )
    }
  ),
]
