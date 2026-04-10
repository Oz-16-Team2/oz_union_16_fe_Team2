import { useCallback, useState } from 'react'

import type { DropdownOption } from '../../dropdown'
import { Dropdown } from '../../dropdown'
import type { ModalProps } from '../base/Modal'
import { Modal } from '../base/Modal'

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

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value)
    },
    []
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      onSubmit({ reason, content })
    },
    [onSubmit, reason, content]
  )

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
              className="whitespace-nowrap text-sm text-gray-700"
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
              className="whitespace-nowrap text-sm text-gray-700"
            >
              직접 입력
            </label>
            {/* TODO: 텍스트 에어리어 공통 컴포넌트 만들면 적용 */}
            <textarea
              id="content"
              rows={3}
              value={content}
              onChange={handleContentChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </Modal.Content>
        <Modal.Footer className="mt-7 gap-3 font-light text-white text-xs">
          {/* TODO: 버튼 공통 컴포넌트 만들면 적용 */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-gray-950 px-5 py-1.5 cursor-pointer"
          >
            닫기
          </button>
          <button
            type="submit"
            className="rounded-lg bg-primary-500 px-5 py-1.5 cursor-pointer"
          >
            등록
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}
