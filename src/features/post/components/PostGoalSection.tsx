import { useEffect } from 'react'

import { Dropdown } from '@/components/common/overlay'
import { useToast } from '@/components/common/ui'
import { DonutChart } from '@/components/common/ui/chart/DonutChart'
import { useGoalsQuery } from '@/query/post'

type PostGoalSectionProps = {
  selectedGoalId?: number
  onChange: (goalId: number | undefined) => void
}

export function PostGoalSection({
  selectedGoalId,
  onChange,
}: PostGoalSectionProps) {
  const toast = useToast()
  const { data: goals = [], isError } = useGoalsQuery()

  useEffect(() => {
    if (isError) toast.error('목표 목록을 불러오지 못했습니다.')
  }, [isError, toast])

  const selectedGoal = goals.find((g) => g.goalId === selectedGoalId)

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border-default bg-surface p-4">
      <Dropdown
        options={goals.map((goal) => ({
          value: String(goal.goalId),
          label: goal.title,
        }))}
        value={
          selectedGoalId !== undefined ? String(selectedGoalId) : undefined
        }
        onChange={(val) => {
          if (val === undefined) return onChange(undefined)
          const id = Number(val)
          onChange(Number.isNaN(id) ? undefined : id)
        }}
        placeholder="목표를 선택해주세요."
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
