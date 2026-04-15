import { useState } from 'react'

import { Button, Textarea } from '@/components/common/ui'

import { Dropdown, type DropdownOption } from '../../dropdown/Dropdown'
import { Modal, type ModalProps } from '../base/Modal'

type ReportFormModalProps = {
  options: DropdownOption[]
  title: string
  onSubmit: (data: { reason: string; content: string }) => void
} & Omit<ModalProps, 'children'>

export function ReportFormModal({
  options,
  title = '제목',
  className,
  onSubmit,
  onClose,
  size,
  rounded,
  border,
}: ReportFormModalProps) {
  const [reason, setReason] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit({ reason, content })
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  return (
    <Modal
      onClose={onClose}
      size={size}
      rounded={rounded}
      border={border}
      className={className}
    >
      <Modal.Header>{title}</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
            <label
              htmlFor="reason"
              className="whitespace-nowrap text-sm text-text-muted"
            >
              사유 선택
            </label>
            <Dropdown
              id="reason"
              options={options}
              value={reason}
              onChange={setReason}
              placeholder="선택해주세요"
            />
            <label
              htmlFor="content"
              className="whitespace-nowrap text-sm text-text-muted"
            >
              직접 입력
            </label>
            <Textarea
              id="content"
              size="sm"
              value={content}
              onChange={handleContentChange}
            />
          </div>
        </Modal.Content>
        <Modal.Footer className="mt-7 gap-3">
          <Button
            variant="modal"
            rounded="lg"
            onClick={onClose}
            className="px-5 py-1.5 text-xs font-light"
          >
            닫기
          </Button>
          <Button
            variant="primary"
            rounded="lg"
            type="submit"
            className="px-5 py-1.5 text-xs font-light"
          >
            등록
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}
