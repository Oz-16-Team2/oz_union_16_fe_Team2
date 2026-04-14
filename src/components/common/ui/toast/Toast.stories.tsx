import type { Meta, StoryObj } from '@storybook/react-vite'

import { Toast } from './Toast'
import type { ToastType } from './useToast'

type ToastCase = {
  type: ToastType
  message: string
}

const toastCases: ToastCase[] = [
  { type: 'success', message: '등록되었습니다' },
  { type: 'warning', message: '입력값을 확인해주세요' },
  { type: 'error', message: '잠시 후 다시 시도해주세요' },
  { type: 'info', message: '변경 사항이 저장됩니다' },
]

const meta: Meta = {
  title: 'Common/Toast',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj

export const Playground: Story = {
  render: () => (
    <div className="flex flex-col gap-7">
      {toastCases.map(({ type, message }) => (
        <Toast key={type} type={type} message={message} />
      ))}
    </div>
  ),
}
