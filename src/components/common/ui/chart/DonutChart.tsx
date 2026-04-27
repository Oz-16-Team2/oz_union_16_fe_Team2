import { Pie, PieChart } from 'recharts'

import type { GoalStatus } from '@/components/common/ui/card'

type DonutChartProps = {
  progressRate: number
  status?: GoalStatus
  size?: number
}

export function DonutChart({
  progressRate,
  status = 'IN_PROGRESS',
  size = 140,
}: DonutChartProps) {
  const percentage = Math.min(100, Math.max(0, progressRate))

  const innerRadius = size * 0.35
  const outerRadius = size * 0.46

  // 상태별 색상
  const gaugeColor =
    status === 'FAILED' ? 'var(--color-danger-500)' : 'var(--color-primary-500)'

  return (
    <div className="relative flex items-center justify-center">
      <PieChart width={size} height={size}>
        {/* 회색 배경 */}
        <Pie
          data={[{ value: 100 }]}
          dataKey="value"
          innerRadius={size * 0.35}
          outerRadius={size * 0.46}
          fill="var(--color-gray-200)"
          stroke="none"
          isAnimationActive={false}
        />

        {/* 게이지 */}
        <Pie
          data={[{ value: percentage }]}
          dataKey="value"
          startAngle={90}
          endAngle={90 - (percentage / 100) * 360}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill={gaugeColor}
          stroke="none"
          animationDuration={800}
        />
      </PieChart>

      {/* 가운데 텍스트 */}
      <span className="absolute min-w-16 text-center text-4xl font-medium text-text-primary">
        {percentage}%
      </span>
    </div>
  )
}
