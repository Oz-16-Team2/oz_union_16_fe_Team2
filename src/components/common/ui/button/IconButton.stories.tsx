import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronLeft, MoreVertical, Plus } from 'lucide-react'

import IconButton from './IconButton'

const meta: Meta<typeof IconButton> = {
  title: 'Common/Button/IconButton',
  component: IconButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof IconButton>

export const Back: Story = {
  args: {
    icon: <ChevronLeft size={14} />,
    'aria-label': '뒤로가기',
  },
}

export const More: Story = {
  args: {
    icon: <MoreVertical size={14} />,
    'aria-label': '더보기',
  },
}

export const Add: Story = {
  args: {
    icon: <Plus size={14} />,
    'aria-label': '추가',
  },
}
