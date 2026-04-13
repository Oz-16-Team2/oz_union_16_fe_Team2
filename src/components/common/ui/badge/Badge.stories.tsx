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

export const Warning: Story = {
  args: {
    children: '진행중',
    variant: 'warning',
  },
}

export const Error: Story = {
  args: {
    children: '미달성',
    variant: 'error',
  },
}
