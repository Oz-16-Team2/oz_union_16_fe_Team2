import { useCallback, useState } from 'react'

import {
  blueCharacterImage,
  orangeCharacterImage,
  pinkCharacterImage,
  yellowCharacterImage,
} from '@/assets/images'
import { cn } from '@/utils/cn'

import { Modal, type ModalProps } from '../base/Modal'

// 상수로 뺄지 일단 보류
const CHARACTERS = [
  { id: 'yellow', src: yellowCharacterImage, label: '노란 캐릭터' },
  { id: 'blue', src: blueCharacterImage, label: '파란 캐릭터' },
  { id: 'orange', src: orangeCharacterImage, label: '주황 캐릭터' },
  { id: 'pink', src: pinkCharacterImage, label: '분홍 캐릭터' },
]

type CharacterSelectModalProps = {
  onSelect: (id: string) => void
} & Omit<ModalProps, 'children'>

export function CharacterSelectModal({
  className,
  onSelect,
  onClose,
  size,
  rounded,
  border,
}: CharacterSelectModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleSelect = useCallback(() => {
    if (selectedId) onSelect(selectedId)
  }, [selectedId, onSelect])

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
          <p className="text-2xs text-red-400">
            프로필 캐릭터는 한 번 선택하면 변경할 수 없습니다.
          </p>
        }
      >
        캐릭터 선택
      </Modal.Header>
      <Modal.Content>
        <div className="mx-auto flex w-fit gap-3">
          {CHARACTERS.map(({ id, src, label }) => (
            <button
              key={id}
              type="button"
              aria-label={label}
              onClick={() => setSelectedId(id)}
              className={cn(
                'relative flex size-17.5 cursor-pointer transition-transform duration-300',
                selectedId === id && 'scale-110'
              )}
            >
              <img src={src} alt={label} className="size-full object-contain" />
              {selectedId !== id && (
                <div className="pointer-events-none absolute inset-0 rounded-full bg-gray-200/70" />
              )}
            </button>
          ))}
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
          type="button"
          onClick={handleSelect}
          disabled={!selectedId}
          aria-disabled={!selectedId}
          className="rounded-lg bg-primary-500 px-5 py-1.5 cursor-pointer"
        >
          선택
        </button>
      </Modal.Footer>
    </Modal>
  )
}
