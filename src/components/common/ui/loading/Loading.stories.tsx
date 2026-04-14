import type { Meta, StoryObj } from '@storybook/react-vite'

import { Loading } from './Loading'

const meta = {
  title: 'Common/UI/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    showLabel: {
      control: 'boolean',
    },
    fullScreen: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Loading>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'md',
    label: '로딩 중',
    showLabel: false,
    fullScreen: false,
  },
}

export const WithLabel: Story = {
  args: {
    size: 'md',
    label: '데이터를 불러오는 중입니다',
    showLabel: true,
    fullScreen: false,
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    showLabel: true,
    label: '로딩 중',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    showLabel: true,
    label: '잠시만 기다려주세요',
  },
}

export const FullScreen: Story = {
  args: {
    size: 'lg',
    label: '페이지를 불러오는 중입니다',
    showLabel: true,
    fullScreen: true,
  },
}
