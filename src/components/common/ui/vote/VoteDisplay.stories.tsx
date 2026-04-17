import type { Meta, StoryObj } from '@storybook/react-vite'

import { ActionMenu } from '@/components/common/overlay/dropdown/action-menu/ActionMenu'

import { VoteViewerMode } from './Vote.type'
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
    percentage: 20,
    checked: false,
  },
]

const actionMenu = (
  <ActionMenu
    trigger={<span className="text-xl text-text-muted">...</span>}
    items={[
      { label: '수정', onClick: () => {} },
      { label: '삭제', onClick: () => {} },
    ]}
  />
)

export const Guest: Story = {
  args: {
    mode: VoteViewerMode.GUEST,
    options: baseOptions,
    actionLabel: '투표하기',
  },
}

export const Member: Story = {
  args: {
    mode: VoteViewerMode.MEMBER,
    options: [
      { ...baseOptions[0], checked: true },
      { ...baseOptions[1], checked: false },
    ],
    actionLabel: '투표하기',
  },
}

export const Voted: Story = {
  args: {
    mode: VoteViewerMode.VOTED,
    options: [
      { ...baseOptions[0], checked: true },
      { ...baseOptions[1], checked: false },
    ],
    actionLabel: '투표하기',
  },
}

export const Closed: Story = {
  args: {
    mode: VoteViewerMode.CLOSED,
    options: [
      { ...baseOptions[0], checked: true },
      { ...baseOptions[1], checked: false },
    ],
    actionLabel: '투표하기',
    actionSlot: actionMenu,
  },
}

export const InProgressWithMore: Story = {
  args: {
    mode: VoteViewerMode.MEMBER,
    options: [
      { ...baseOptions[0], checked: false },
      { ...baseOptions[1], checked: true },
    ],
    actionLabel: '투표하기',
    actionSlot: actionMenu,
  },
}
