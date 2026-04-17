import type { Meta, StoryObj } from '@storybook/react-vite'

import { VoteEditorMode } from './Vote.type'
import { VoteEditor } from './VoteEditor'

const meta = {
  title: 'Common/UI/Vote/VoteEditor',
  component: VoteEditor,
  tags: ['autodocs'],
} satisfies Meta<typeof VoteEditor>

export default meta

type Story = StoryObj<typeof meta>

export const Create: Story = {
  args: {
    mode: VoteEditorMode.CREATE,
    options: ['운동하기', '공부하기'],
  },
}

export const CreateWithPeriod: Story = {
  args: {
    mode: VoteEditorMode.CREATE,
    period: {
      start: new Date('2026-04-01'),
      end: new Date('2026-04-06'),
    },
    options: ['운동하기', '공부하기'],
  },
}

export const Edit: Story = {
  args: {
    mode: VoteEditorMode.EDIT,
    period: {
      start: new Date('2026-04-01'),
      end: new Date('2026-04-06'),
    },
    options: ['운동하기', '공부하기'],
  },
}
