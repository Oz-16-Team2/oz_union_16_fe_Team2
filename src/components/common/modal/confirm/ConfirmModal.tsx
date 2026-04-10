import type { ModalProps } from '../base/Modal'
import { Modal } from '../base/Modal'

type ConfirmModalProps = {
  description: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
} & Omit<ModalProps, 'children'>

export function ConfirmModal({
  description,
  confirmLabel = '삭제',
  cancelLabel = '취소',
  className,
  onConfirm,
  onClose,
  size,
  rounded,
  border,
}: ConfirmModalProps) {
  return (
    <Modal
      onClose={onClose}
      size={size}
      rounded={rounded}
      border={border}
      className={className}
    >
      <div className="flex flex-col gap-7">
        <Modal.Content className="text-base leading-[1.4] tracking-[-0.03em] text-gray-800">
          {description}
        </Modal.Content>
        <Modal.Footer className="justify-end gap-3">
          {/* TODO: 버튼 공통 컴포넌트 만들면 적용 */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-[100px] bg-gray-950 px-6 py-2 text-base font-semibold text-white"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-[100px] bg-primary-500 px-6 py-2 text-base font-semibold text-white"
          >
            {confirmLabel}
          </button>
        </Modal.Footer>
      </div>
    </Modal>
  )
}
