import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './Button'

const meta = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: '버튼',
    variant: 'primary',
    size: 'md',
    rounded: 'default',
    disabled: false,
    fullWidth: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'danger',
        'neutral',
        'dark',
        'outline',
        'textDanger',
        'textPrimary',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    rounded: {
      control: 'select',
      options: ['default', 'pill'],
    },
    fullWidth: {
      control: 'boolean',
    },
    leftIcon: {
      control: false,
    },
    rightIcon: {
      control: false,
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: '투표하기',
    variant: 'primary',
    size: 'md',
  },
}

export const Secondary: Story = {
  args: {
    children: '수정',
    variant: 'secondary',
    size: 'sm',
  },
}

export const Danger: Story = {
  args: {
    children: '삭제',
    variant: 'danger',
    size: 'sm',
  },
}

export const Neutral: Story = {
  args: {
    children: '취소',
    variant: 'neutral',
    size: 'sm',
  },
}

export const Dark: Story = {
  args: {
    children: '로그인',
    variant: 'dark',
    rounded: 'pill',
    className: 'w-[450px] py-[18px]',
  },
}

export const Outline: Story = {
  args: {
    children: '인증',
    variant: 'outline',
    size: 'sm',
    rounded: 'pill',
  },
}

export const TextDanger: Story = {
  args: {
    children: '신고',
    variant: 'textDanger',
    size: 'md',
  },
}

export const TextPrimary: Story = {
  args: {
    children: '회원가입',
    variant: 'textPrimary',
    size: 'md',
    className: 'px-0 py-0',
  },
}

export const Pill: Story = {
  args: {
    children: '게시글 작성',
    variant: 'primary',
    size: 'md',
    rounded: 'pill',
  },
}

export const Disabled: Story = {
  args: {
    children: '투표하기',
    disabled: true,
  },
}
