import { lazy, Suspense, useEffect } from 'react'

import { X } from 'lucide-react'

import { Dropdown } from '@/components/common/overlay'
import { useToast } from '@/components/common/ui'
import { useGoalsQuery } from '@/query/post'

const DonutChart = lazy(() =>
  import('@/components/common/ui/chart/DonutChart').then((m) => ({
    default: m.DonutChart,
  }))
)

type PostGoalSectionProps = {
  selectedGoalId?: number
  onChange: (goalId: number | undefined) => void
}

export function PostGoalSection({
  selectedGoalId,
  onChange,
}: PostGoalSectionProps) {
  const toast = useToast()
  const { data: goals = [], isError, isLoading } = useGoalsQuery()

  useEffect(() => {
    if (isError) toast.error('목표 목록을 불러오지 못했습니다.')
  }, [isError, toast])

  const selectedGoal = goals.find((g) => g.goalId === selectedGoalId)

  const dropdownPlaceholder = isLoading
    ? '진행 중인 목표를 불러오는 중입니다.'
    : isError
      ? '목표 목록을 불러오지 못했습니다.'
      : goals.length === 0
        ? '진행 중인 목표가 없습니다.'
        : '목표를 선택해주세요.'

  const isDropdownDisabled = isLoading || isError || goals.length === 0

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
          const id = Number(val)
          onChange(Number.isNaN(id) ? undefined : id)
        }}
        placeholder={dropdownPlaceholder}
        disabled={isDropdownDisabled}
      />

      {selectedGoal && (
        <div className="flex flex-col gap-3 rounded-xl border border-border-default bg-surface p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-text-primary">
              개별 목표
            </span>
            <button
              type="button"
              onClick={() => onChange(undefined)}
              aria-label="목표 선택 취소"
              className="text-text-muted hover:text-text-primary cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-bold text-text-primary">{selectedGoal.title}</p>
            <p className="text-xs text-text-muted">
              {selectedGoal.startDate} - {selectedGoal.endDate}
            </p>
          </div>

          <div className="flex justify-center">
            <Suspense
              fallback={
                <div className="flex size-35 items-center justify-center mx-auto">
                  <div className="size-32.5 rounded-full border-15 border-gray-200 animate-pulse" />
                </div>
              }
            >
              <DonutChart
                progressRate={selectedGoal.progressRate}
                status={selectedGoal.status}
              />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  )
}
