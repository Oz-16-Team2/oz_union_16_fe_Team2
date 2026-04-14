import type { Meta, StoryObj } from '@storybook/react-vite'

import { Card } from './Card'

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Common/Card',
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => <Card />,
}

export const DarkDefault: Story = {
  render: () => (
    <div className="dark bg-surface p-6 rounded-lg">
      <Card />
    </div>
  ),
}
