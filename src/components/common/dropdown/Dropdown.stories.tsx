import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Dropdown } from './Dropdown'

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  title: 'Common/Dropdown',
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Dropdown>

const reportOptions = [
  { value: 'spam', label: '스팸' },
  { value: 'abuse', label: '욕설/비방' },
  { value: 'test', label: '테스트' },
  { value: 'etc', label: '기타' },
]

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div className="w-[340px]">
        <Dropdown options={reportOptions} value={value} onChange={setValue} />
      </div>
    )
  },
}
