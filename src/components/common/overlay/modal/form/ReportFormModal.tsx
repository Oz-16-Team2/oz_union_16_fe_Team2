import { useState } from 'react'

import { Button, Textarea } from '@/components/common/ui'
import { cn } from '@/utils/cn'

import { Dropdown, type DropdownOption } from '../../dropdown/Dropdown'
import { Modal, type ModalProps } from '../base/Modal'

type ReportFormModalProps = {
  options: DropdownOption[]
  title: string
  isSubmitting?: boolean
  disabled?: boolean
  disabledMessage?: string
  onSubmit: (data: { reason: string; content: string }) => void
} & Omit<ModalProps, 'children'>

export function ReportFormModal({
  options,
  title = '제목',
  isSubmitting = false,
  disabled = false,
  disabledMessage = '*로그인 후 이용 가능합니다.',
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
    if (disabled) return
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
      className={cn('w-[calc(100vw-32px)] sm:w-full', className)}
    >
      <Modal.Header>{title}</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Content>
          <div className="grid grid-cols-1 items-start gap-2 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-x-4 sm:gap-y-3">
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
              disabled={disabled}
              className="w-full min-w-0"
            />
            <label
              htmlFor="content"
              className="mt-2 whitespace-nowrap text-sm text-text-muted sm:mt-0"
            >
              직접 입력
            </label>
            <Textarea
              id="content"
              size="sm"
              value={content}
              onChange={handleContentChange}
              disabled={disabled}
              className="w-full min-w-0"
            />
            {disabled && (
              <p className="-mt-1 text-left text-sm text-status-error-text sm:col-span-2">
                {disabledMessage}
              </p>
            )}
          </div>
        </Modal.Content>
        <Modal.Footer className="mt-5 gap-3">
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
            disabled={disabled || isSubmitting}
            className="px-5 py-1.5 text-xs font-light"
          >
            {isSubmitting ? '처리중...' : '등록'}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}
