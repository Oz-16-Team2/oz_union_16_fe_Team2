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
      options: [
        'primary',
        'secondary',
        'danger',
        'neutral',
        'outline',
        'textDanger',
        'textPrimary',
        'auth',
      ],
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

export const TextDanger: Story = {
  args: {
    children: '신고',
    variant: 'textDanger',
    size: 'md',
    rounded: 'md',
  },
}

export const TextPrimary: Story = {
  args: {
    children: '회원가입',
    variant: 'textPrimary',
    size: 'md',
    rounded: 'md',
    className: 'px-0 py-0',
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

export const LoginButton: Story = {
  args: {
    children: '로그인',
    variant: 'auth',
    rounded: 'full',
    className: 'w-[450px] py-[18px]',
  },
}

export const SignupButton: Story = {
  args: {
    children: '회원가입',
    variant: 'auth',
    rounded: 'full',
    className: 'w-[492px] py-[18px]',
  },
}
