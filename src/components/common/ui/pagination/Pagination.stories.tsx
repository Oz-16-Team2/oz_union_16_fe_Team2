import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { cn } from '@/utils/cn'

import { Pagination } from './Pagination'

type PaginationStoryArgs = React.ComponentProps<typeof Pagination> & {
  isDark: boolean
}

const meta: Meta<PaginationStoryArgs> = {
  title: 'Common/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => (
      <div
        className={cn(
          'p-6 rounded-xl',
          context.args.isDark ? 'dark bg-gray-950' : 'bg-surface'
        )}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    isDark: false,
    currentPage: 1,
    totalPages: 20,
  },
  argTypes: {
    isDark: {
      control: 'boolean',
      description: '다크 모드',
    },
    onPageChange: { action: 'onPageChange' },
  },
}

export default meta

type Story = StoryObj<PaginationStoryArgs>

export const Default: Story = {
  render: ({ isDark: _isDark, ...args }) => {
    const [page, setPage] = useState(args.currentPage)
    return (
      <Pagination
        {...args}
        currentPage={page}
        onPageChange={(p) => {
          setPage(p)
          args.onPageChange(p)
        }}
      />
    )
  },
}
