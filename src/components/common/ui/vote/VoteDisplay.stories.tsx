import type { Meta, StoryObj } from '@storybook/react-vite'

import { VoteDisplay } from './VoteDisplay'

const meta = {
  title: 'Common/UI/Vote/VoteDisplay',
  component: VoteDisplay,
  tags: ['autodocs'],
} satisfies Meta<typeof VoteDisplay>

export default meta

type Story = StoryObj<typeof meta>

const baseOptions = [
  {
    id: '1',
    optionLabel: '옵션 1',
    valueLabel: '운동하기',
    percentage: 80,
    checked: false,
  },
  {
    id: '2',
    optionLabel: '옵션 2',
    valueLabel: '공부하기',
    percentage: 80,
    checked: false,
  },
]

export const Guest: Story = {
  args: {
    mode: 'guest',
    options: baseOptions,
    actionLabel: '투표하기',
  },
}

export const Member: Story = {
  args: {
    mode: 'member',
    options: [
      { ...baseOptions[0], checked: true },
      { ...baseOptions[1], checked: false },
    ],
    actionLabel: '투표하기',
  },
}

export const Voted: Story = {
  args: {
    mode: 'voted',
    options: [
      { ...baseOptions[0], checked: true },
      { ...baseOptions[1], checked: false },
    ],
    actionLabel: '투표하기',
  },
}

export const Closed: Story = {
  args: {
    mode: 'closed',
    options: [
      { ...baseOptions[0], checked: true },
      { ...baseOptions[1], checked: false },
    ],
    actionLabel: '투표하기',
    showMoreButton: true,
  },
}

export const InProgressWithMore: Story = {
  args: {
    mode: 'member',
    options: [
      { ...baseOptions[0], checked: false },
      { ...baseOptions[1], checked: true },
    ],
    actionLabel: '투표하기',
    showMoreButton: true,
  },
}
