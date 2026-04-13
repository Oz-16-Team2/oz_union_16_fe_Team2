import type { Meta, StoryObj } from '@storybook/react-vite'

import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    children: '버튼',
    variant: 'primary',
    size: 'md',
    rounded: 'md',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'neutral', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    rounded: {
      control: 'select',
      options: ['md', 'full'],
    },
    leftIcon: { control: false },
    rightIcon: { control: false },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: '투표하기',
    variant: 'primary',
    size: 'md',
    rounded: 'md',
  },
}

export const Secondary: Story = {
  args: {
    children: '수정',
    variant: 'secondary',
    size: 'sm',
    rounded: 'md',
  },
}

export const Danger: Story = {
  args: {
    children: '삭제',
    variant: 'danger',
    size: 'sm',
    rounded: 'md',
  },
}

export const Neutral: Story = {
  args: {
    children: '취소',
    variant: 'neutral',
    size: 'sm',
    rounded: 'md',
  },
}

export const Outline: Story = {
  args: {
    children: '인증',
    variant: 'outline',
    size: 'sm',
    rounded: 'full',
  },
}

export const Pill: Story = {
  args: {
    children: '게시글 작성',
    variant: 'primary',
    size: 'md',
    rounded: 'full',
  },
}

export const Disabled: Story = {
  args: {
    children: '투표하기',
    variant: 'primary',
    size: 'md',
    rounded: 'md',
    disabled: true,
  },
}
