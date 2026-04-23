import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Ranking } from './components/Ranking'
import type { ApiRankingItem } from './Ranking.api.types'
import type { RankingType } from './Ranking.types'

const meta: Meta<typeof Ranking> = {
  component: Ranking,
  title: 'Features/Main/Ranking',
}
export default meta

type Story = StoryObj<typeof Ranking>

const MOCK_WEEKLY: ApiRankingItem[] = [
  {
    user_id: 1,
    nickname: '운동왕',
    rank: 1,
    week_cert_count: 20,
    profile_img_url: null,
  },
  {
    user_id: 2,
    nickname: '헬스마니아',
    rank: 2,
    week_cert_count: 18,
    profile_img_url: null,
  },
  {
    user_id: 3,
    nickname: '달리기선수',
    rank: 3,
    week_cert_count: 15,
    profile_img_url: null,
  },
  {
    user_id: 4,
    nickname: '요가고수',
    rank: 4,
    week_cert_count: 12,
    profile_img_url: null,
  },
  {
    user_id: 5,
    nickname: '수영러버',
    rank: 5,
    week_cert_count: 10,
    profile_img_url: null,
  },
]

const MOCK_BY_TYPE: Record<RankingType, ApiRankingItem[]> = {
  weekly: MOCK_WEEKLY,
  monthly: [
    {
      user_id: 1,
      nickname: '운동왕',
      rank: 1,
      month_cert_count: 80,
      profile_img_url: null,
    },
    {
      user_id: 3,
      nickname: '달리기선수',
      rank: 2,
      month_cert_count: 72,
      profile_img_url: null,
    },
    {
      user_id: 2,
      nickname: '헬스마니아',
      rank: 3,
      month_cert_count: 65,
      profile_img_url: null,
    },
    {
      user_id: 5,
      nickname: '수영러버',
      rank: 4,
      month_cert_count: 50,
      profile_img_url: null,
    },
    {
      user_id: 4,
      nickname: '요가고수',
      rank: 5,
      month_cert_count: 45,
      profile_img_url: null,
    },
  ],
  total: [
    {
      user_id: 3,
      nickname: '달리기선수',
      rank: 1,
      total_cert_count: 520,
      profile_img_url: null,
    },
    {
      user_id: 1,
      nickname: '운동왕',
      rank: 2,
      total_cert_count: 498,
      profile_img_url: null,
    },
    {
      user_id: 4,
      nickname: '요가고수',
      rank: 3,
      total_cert_count: 430,
      profile_img_url: null,
    },
    {
      user_id: 2,
      nickname: '헬스마니아',
      rank: 4,
      total_cert_count: 380,
      profile_img_url: null,
    },
    {
      user_id: 5,
      nickname: '수영러버',
      rank: 5,
      total_cert_count: 310,
      profile_img_url: null,
    },
  ],
}

export const Default: Story = {
  render: () => {
    const [type, setType] = useState<RankingType>('weekly')
    return (
      <Ranking
        rankings={MOCK_BY_TYPE[type]}
        isLoading={false}
        isError={false}
        activeType={type}
        onTypeChange={setType}
      />
    )
  },
}

export const Loading: Story = {
  render: () => (
    <Ranking
      rankings={[]}
      isLoading
      isError={false}
      activeType="weekly"
      onTypeChange={() => {}}
    />
  ),
}

export const Dark: Story = {
  render: () => {
    const [type, setType] = useState<RankingType>('weekly')
    return (
      <div className="dark bg-surface p-6 rounded-lg">
        <Ranking
          rankings={MOCK_BY_TYPE[type]}
          isLoading={false}
          isError={false}
          activeType={type}
          onTypeChange={setType}
        />
      </div>
    )
  },
}
