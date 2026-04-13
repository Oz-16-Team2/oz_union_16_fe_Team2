import type { Meta, StoryObj } from '@storybook/react-vite'

import { Calendar } from './Calendar'

// Storybook에서 캘린더 기본 상태를 확인하기 위한 문서용 설정이다.
const meta: Meta<typeof Calendar> = {
  component: Calendar,
  title: 'Common/Calendar',
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  render: () => <Calendar />,
}
