import { useState } from 'react'

import { formatError } from '@/apis/api.utils'
import { useRankingQuery } from '@/query/main/useRankingQuery'

import type { RankingType } from '../Ranking.types'
import { Ranking } from './Ranking'

export function RankingSection() {
  const [activeType, setActiveType] = useState<RankingType>('weekly')

  const { data = [], isLoading, isError, error } = useRankingQuery(activeType)

  const errorDetail = error?.response?.data.error_detail
  const errorMessage = errorDetail ? formatError(errorDetail) : undefined

  return (
    <Ranking
      rankings={data}
      isLoading={isLoading}
      isError={isError}
      errorMessage={errorMessage}
      activeType={activeType}
      onTypeChange={setActiveType}
      className="w-full"
    />
  )
}
