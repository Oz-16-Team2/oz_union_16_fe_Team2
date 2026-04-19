import { Dropdown } from '@/components/common/overlay'
import { DonutChart } from '@/components/common/ui/chart/DonutChart'

import type { GoalOption, PostFormMode } from '../post.types'

// TODO: 레이아웃 테스트용 mock 데이터 -> MSW 연동 필요
// 실제 데이터는 GET lazy fetch 예정
const MOCK_GOALS: GoalOption[] = [
  {
    id: 1,
    title: '매일 1시간 운동',
    startDate: '2026.04.01',
    endDate: '2026.06.30',
    progressRate: 48,
    status: 'IN_PROGRESS',
  },
  {
    id: 2,
    title: '매일 독서 30분',
    startDate: '2026.04.01',
    endDate: '2026.04.30',
    progressRate: 70,
    status: 'IN_PROGRESS',
  },
  {
    id: 3,
    title: '코딩 스터디',
    startDate: '2026.03.01',
    endDate: '2026.05.31',
    progressRate: 30,
    status: 'IN_PROGRESS',
  },
]

type PostGoalSectionProps = {
  mode: PostFormMode
  selectedGoalId?: number
  onChange: (goalId: number | undefined) => void
}

export function PostGoalSection({
  mode,
  selectedGoalId,
  onChange,
}: PostGoalSectionProps) {
  // TODO: API 연동 시 MOCK_GOALS를 useQuery 또는 fetch 결과로 교체
  // GET /api/v1/goals?status=IN_PROGRESS
  const goals = MOCK_GOALS

  const selectedGoal = goals.find((g) => g.id === selectedGoalId)
  const placeholder =
    mode === 'create'
      ? '목표를 선택해주세요.'
      : '해당되는 항목을 선택해 주세요.'

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border-default bg-surface p-4">
      <Dropdown
        options={goals.map((g) => ({ value: String(g.id), label: g.title }))}
        value={
          selectedGoalId !== undefined ? String(selectedGoalId) : undefined
        }
        onChange={(val) =>
          onChange(val !== undefined ? Number(val) : undefined)
        }
        placeholder={placeholder}
      />

      {selectedGoal && (
        <div className="flex flex-col gap-3 rounded-xl border border-border-default bg-surface p-4">
          <span className="text-sm font-bold text-text-primary">개별 목표</span>

          <div className="flex flex-col gap-1">
            <p className="font-bold text-text-primary">{selectedGoal.title}</p>
            <p className="text-xs text-text-muted">
              {selectedGoal.startDate} - {selectedGoal.endDate}
            </p>
          </div>

          <div className="flex justify-center">
            <DonutChart
              progressRate={selectedGoal.progressRate}
              status="progress"
            />
          </div>
        </div>
      )}
    </div>
  )
}
