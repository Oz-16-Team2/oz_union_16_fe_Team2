import type { Meta, StoryObj } from '@storybook/react-vite'

import { SearchBar } from './SearchBar'

const meta: Meta<typeof SearchBar> = {
  title: 'Common/SearchBar',
  component: SearchBar,
  parameters: { layout: 'centered' },
}

export default meta

type Story = StoryObj<typeof SearchBar>

export const Default: Story = {
  render: () => (
    <SearchBar
      placeholder="게시글 검색"
      onSearch={(value) => alert(`검색: ${value}`)}
    />
  ),
}

export const DarkDefault: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-surface p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <SearchBar
      placeholder="게시글 검색"
      onSearch={(value) => alert(`검색: ${value}`)}
    />
  ),
}
