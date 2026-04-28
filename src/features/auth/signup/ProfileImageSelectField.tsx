import { useMemo, useState } from 'react'

import { CharacterSelectModal } from '@/components/common/overlay'
import {
  DEFAULT_PROFILE_AVATAR,
  getProfileAvatarImageUrl,
  PROFILE_AVATAR_OPTIONS,
} from '@/shared/profileAvatar'
import { cn } from '@/utils/cn'

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

  // 폼에는 서버로 보낼 profile_image_url을 저장하고,
  // 화면 선택 상태는 공용 아바타 목록에서 다시 찾아서 보여줍니다.
  const selectedCharacter = useMemo(
    () =>
      PROFILE_AVATAR_OPTIONS.find(
        (character) => character.imageUrl === value
      ) ?? DEFAULT_PROFILE_AVATAR,
    [value]
  )

  const handleSelectCharacter = (code: string) => {
    const character = PROFILE_AVATAR_OPTIONS.find((item) => item.code === code)
    if (!character) return
    onChange(character.imageUrl)
    setIsActive(true)
    setIsOpen(false)
  }

  return (
    <div className="grid w-full grid-cols-[26%_1fr] items-center">
      <span className="text-sm leading-tight">프로필 선택</span>
      <button
        type="button"
        aria-label="프로필 선택"
        className="group relative size-16 cursor-pointer rounded-full transition-transform duration-200 ease-out hover:scale-110"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={getProfileAvatarImageUrl(selectedCharacter.imageUrl)}
          alt={selectedCharacter.label}
          className="size-12 sm:size-16 rounded-full object-contain shrink-0"
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
          characters={PROFILE_AVATAR_OPTIONS}
          defaultSelectedCode={selectedCharacter.code}
          onClose={() => setIsOpen(false)}
          onSelect={handleSelectCharacter}
        />
      ) : null}
    </div>
  )
}
