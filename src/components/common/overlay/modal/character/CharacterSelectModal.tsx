import { useCallback, useState } from 'react'

import { Button } from '@/components/common/ui'
import type { ProfileAvatarOption } from '@/shared/profileAvatar'
import { cn } from '@/utils/cn'

import { Modal, type ModalProps } from '../base/Modal'

type CharacterSelectModalProps = {
  characters: ProfileAvatarOption[]
  defaultSelectedCode?: ProfileAvatarOption['code']
  onSelect: (code: ProfileAvatarOption['code']) => void
} & Omit<ModalProps, 'children'>

export function CharacterSelectModal({
  characters,
  className,
  defaultSelectedCode,
  onSelect,
  onClose,
  size,
  rounded,
  border,
}: CharacterSelectModalProps) {
  const [selectedCode, setSelectedCode] = useState<
    ProfileAvatarOption['code'] | null
  >(defaultSelectedCode ?? null)

  const handleSelect = useCallback(() => {
    if (selectedCode) onSelect(selectedCode)
  }, [selectedCode, onSelect])

  return (
    <Modal
      onClose={onClose}
      size={size}
      rounded={rounded}
      border={border}
      className={className}
    >
      <Modal.Header
        description={
          <p className="text-[10px] text-red-400">
            프로필 캐릭터는 한 번 선택하면 변경할 수 없습니다.
          </p>
        }
      >
        캐릭터 선택
      </Modal.Header>
      <Modal.Content>
        <div className="mx-auto flex w-fit gap-3">
          {characters.map(({ code, imageUrl, label }) => (
            <button
              key={code}
              type="button"
              aria-label={label}
              onClick={() => setSelectedCode(code)}
              className={cn(
                'relative flex size-[70px] cursor-pointer transition-transform duration-300',
                selectedCode === code && 'scale-110'
              )}
            >
              <img
                src={imageUrl}
                alt={label}
                className="h-full w-full object-contain"
              />
              {selectedCode !== code && (
                <div className="pointer-events-none absolute inset-0 rounded-full bg-gray-200/70 dark:bg-gray-950/50" />
              )}
            </button>
          ))}
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
          onClick={handleSelect}
          disabled={!selectedCode}
          aria-disabled={!selectedCode}
          className="px-5 py-1.5 text-xs font-light"
        >
          선택
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
