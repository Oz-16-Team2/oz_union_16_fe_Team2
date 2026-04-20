import { useMemo, useState } from 'react'

import {
  blueCharacterImage,
  orangeCharacterImage,
  pinkCharacterImage,
  yellowCharacterImage,
} from '@/assets/images'
import { CharacterSelectModal } from '@/components/common/overlay'
import { cn } from '@/utils/cn'

// API 연결 전 임시 캐릭터 목록입니다. 추후 백엔드에서 받은 이미지 URL 목록으로 교체합니다.
const CHARACTER_IMAGES = [
  { id: 'yellow', src: yellowCharacterImage, label: '노란 캐릭터' },
  { id: 'blue', src: blueCharacterImage, label: '파란 캐릭터' },
  { id: 'orange', src: orangeCharacterImage, label: '주황 캐릭터' },
  { id: 'pink', src: pinkCharacterImage, label: '분홍 캐릭터' },
]

type ProfileImageSelectFieldProps = {
  value?: string
  onChange: (value: string) => void
}

export function ProfileImageSelectField({
  value,
  onChange,
}: ProfileImageSelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isActive, setIsActive] = useState(false)

  // 선택값이 없으면 기본 캐릭터를 보여줍니다.
  const selectedCharacter = useMemo(
    () =>
      CHARACTER_IMAGES.find((character) => character.src === value) ??
      CHARACTER_IMAGES[0],
    [value]
  )

  const handleSelectCharacter = (id: string) => {
    const character = CHARACTER_IMAGES.find((item) => item.id === id)
    if (!character) return

    onChange(character.src)
    setIsActive(true)
    setIsOpen(false)
  }

  return (
    <div className="grid w-full grid-cols-[120px_1fr] items-center">
      <span className="text-sm leading-tight">프로필 캐릭터 선택</span>
      <button
        type="button"
        aria-label="프로필 캐릭터 선택"
        className="group relative size-16 cursor-pointer rounded-full transition-transform duration-200 ease-out hover:scale-110"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={selectedCharacter.src}
          alt={selectedCharacter.label}
          className="size-16 rounded-full object-contain shrink-0"
        />
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 rounded-full bg-gray-200/70 transition-opacity duration-200 dark:bg-gray-950/50',
            'group-hover:opacity-0 group-focus-visible:opacity-0',
            (isOpen || isActive) && 'opacity-0'
          )}
        />
      </button>

      {isOpen ? (
        <CharacterSelectModal
          onClose={() => setIsOpen(false)}
          onSelect={handleSelectCharacter}
        />
      ) : null}
    </div>
  )
}
