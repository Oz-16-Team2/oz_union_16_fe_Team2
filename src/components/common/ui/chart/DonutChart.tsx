import { Pie, PieChart } from 'recharts'

type DonutChartProps = {
  completedCount: number
  totalCount: number
  status?: 'progress' | 'done' | 'fail'
}

export function DonutChart({
  completedCount,
  totalCount,
  status = 'progress',
}: DonutChartProps) {
  const percentage =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)

  // 상태별 색상
  const gaugeColor =
    status === 'fail' ? 'var(--color-danger-500)' : 'var(--color-primary-500)'

  return (
    <div className="relative flex items-center justify-center">
      <PieChart width={140} height={140}>
        {/* 회색 배경 */}
        <Pie
          data={[{ value: 100 }]}
          dataKey="value"
          innerRadius={50}
          outerRadius={65}
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
          innerRadius={50}
          outerRadius={65}
          fill={gaugeColor}
          stroke="none"
          animationDuration={800}
        />
      </PieChart>

      {/* 가운데 텍스트 */}
      <span className="absolute min-w-15 text-center text-4xl font-medium text-text-primary">
        {percentage}%
      </span>
    </div>
  )
}
