import type { Meta, StoryObj } from '@storybook/react-vite'

import { TabButton } from './TabButton'

const meta = {
  title: 'Common/UI/TabButton',
  component: TabButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TabButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '탭',
    isActive: false,
  },
}

export const Active: Story = {
  args: {
    children: '활성 탭',
    isActive: true,
  },
}
