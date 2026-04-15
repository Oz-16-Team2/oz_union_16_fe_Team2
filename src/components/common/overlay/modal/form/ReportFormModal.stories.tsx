import type { Meta, StoryObj } from '@storybook/react-vite'

import { useModal } from '@/hooks/useModal'

import { ReportFormModal } from './ReportFormModal'

const meta: Meta<typeof ReportFormModal> = {
  component: ReportFormModal,
  title: 'Common/Modal/ReportFormModal',
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof ReportFormModal>

// 테스트용 데이터
const REPORT_REASONS = [
  { value: 'spam', label: '스팸' },
  { value: 'abuse', label: '욕설/비방' },
  { value: 'test', label: '테스트' },
  { value: 'etc', label: '기타' },
]

export const Report: Story = {
  render: (args) => {
    const { isOpen, open, close } = useModal()
    return (
      <>
        <button
          type="button"
          onClick={open}
          className="rounded-lg bg-primary-500 px-5 py-2 text-white cursor-pointer"
        >
          모달 열기
        </button>
        {isOpen && (
          <ReportFormModal
            {...args}
            title="신고 선택 및 작성"
            onClose={close}
            onSubmit={close}
          />
        )}
      </>
    )
  },
  args: {
    options: REPORT_REASONS,
  },
}

export const Dark: Story = {
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
  render: (args) => <ReportFormModal {...args} title="신고 선택 및 작성" />,
  args: {
    options: REPORT_REASONS,
    onClose: () => {},
    onSubmit: () => {},
  },
}
