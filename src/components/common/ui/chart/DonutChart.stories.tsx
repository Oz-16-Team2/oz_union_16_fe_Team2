import type { Meta, StoryObj } from '@storybook/react-vite'

import { DonutChart } from './DonutChart'

const meta: Meta<typeof DonutChart> = {
  title: 'Common/UI/Chart/DonutChart',
  component: DonutChart,
  tags: ['autodocs'], // ⭐ 이거 추가
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof DonutChart>

export const InProgress: Story = {
  args: {
    completedCount: 3,
    totalCount: 10,
  },
}

export const Zero: Story = {
  args: {
    completedCount: 0,
    totalCount: 10,
  },
}

export const Full: Story = {
  args: {
    completedCount: 10,
    totalCount: 10,
  },
}
