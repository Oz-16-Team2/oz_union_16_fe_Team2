import { Button } from '@/components/common/ui'
import { cn } from '@/utils/cn'

import { Modal, type ModalProps } from '../base/Modal'

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
      className={cn('w-[calc(100vw-32px)] sm:w-full', className)}
    >
      <div className="flex flex-col gap-7">
        <Modal.Content className="text-base leading-[1.4] tracking-[-0.03em] text-text-primary">
          {description}
        </Modal.Content>
        <Modal.Footer className="justify-end gap-3">
          <Button
            variant="modal"
            size="md"
            rounded="full"
            onClick={onClose}
            className="px-5 font-semibold"
          >
            {cancelLabel}
          </Button>
          <Button
            variant="primary"
            size="md"
            rounded="full"
            onClick={onConfirm}
            className="px-5 font-semibold"
          >
            {confirmLabel}
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  )
}
