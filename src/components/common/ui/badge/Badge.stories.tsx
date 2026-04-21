import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Common/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Success: Story = {
  args: {
    children: '완료',
    variant: 'success',
  },
}

export const InProgress: Story = {
  args: {
    children: '진행중',
    variant: 'inProgress',
  },
}

export const Failed: Story = {
  args: {
    children: '미달성',
    variant: 'failed',
  },
}
