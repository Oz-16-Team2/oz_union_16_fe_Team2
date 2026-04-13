import type { Meta, StoryObj } from '@storybook/react-vite'

import { useModal } from '@/hooks/useModal'

import { ConfirmModal } from './ConfirmModal'

const meta: Meta<typeof ConfirmModal> = {
  component: ConfirmModal,
  title: 'Common/Modal/ConfirmModal',
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof ConfirmModal>

export const Delete: Story = {
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
        {isOpen && <ConfirmModal {...args} onConfirm={close} onClose={close} />}
      </>
    )
  },
  args: {
    description:
      '삭제된 내용은 복구할 수 없습니다.\n게시글을 정말로 삭제하시겠습니까?',
    confirmLabel: '삭제',
    cancelLabel: '취소',
  },
}

export const ScrollLock: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args) => {
    const { isOpen, open, close } = useModal()
    return (
      <div className="p-8">
        <button
          type="button"
          onClick={open}
          className="rounded-lg bg-primary-500 px-5 py-2 text-white cursor-pointer"
        >
          모달 열기
        </button>
        {Array.from({ length: 30 }, (_, i) => (
          <p key={i} className="my-4 text-gray-500">
            스크롤 테스트용 더미 콘텐츠 {i + 1}번째 줄입니다.
          </p>
        ))}
        {isOpen && <ConfirmModal {...args} onConfirm={close} onClose={close} />}
      </div>
    )
  },
  args: {
    description: '스크롤 안먹히지롱',
    confirmLabel: '확인',
    cancelLabel: '취소',
  },
}

export const Register: Story = {
  render: (args) => {
    const { isOpen, open, close } = useModal()
    return (
      <>
        <button
          type="button"
          onClick={open}
          className="rounded-[8px] bg-primary-500 px-[20px] py-[8px] text-white cursor-pointer"
        >
          모달 열기
        </button>
        {isOpen && <ConfirmModal {...args} onConfirm={close} onClose={close} />}
      </>
    )
  },
  args: {
    description: '게시글을 등록하시겠습니까?',
    confirmLabel: '등록',
    cancelLabel: '취소',
  },
}
