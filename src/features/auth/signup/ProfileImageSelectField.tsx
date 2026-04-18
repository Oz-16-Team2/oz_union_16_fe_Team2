import { useMemo, useState } from 'react'
import {
  type Control,
  type FieldErrors,
  type UseFormSetValue,
  useWatch,
} from 'react-hook-form'

import {
  blueCharacterImage,
  orangeCharacterImage,
  pinkCharacterImage,
  yellowCharacterImage,
} from '@/assets/images'
import { CharacterSelectModal } from '@/components/common/overlay'
import { Button } from '@/components/common/ui'
import type { SignupSchema } from '@/schemas/auth/signup'

// API 연결 전 임시 캐릭터 목록입니다. 추후 백엔드에서 받은 이미지 URL 목록으로 교체합니다.
const CHARACTER_IMAGES = [
  { id: 'yellow', src: yellowCharacterImage, label: '노란 캐릭터' },
  { id: 'blue', src: blueCharacterImage, label: '파란 캐릭터' },
  { id: 'orange', src: orangeCharacterImage, label: '주황 캐릭터' },
  { id: 'pink', src: pinkCharacterImage, label: '분홍 캐릭터' },
]

type ProfileImageSelectFieldProps = {
  control: Control<SignupSchema>
  errors: FieldErrors<SignupSchema>
  setValue: UseFormSetValue<SignupSchema>
}

export function ProfileImageSelectField({
  control,
  setValue,
}: ProfileImageSelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false)
  const profileImageUrl = useWatch({ control, name: 'profile_image_url' })

  // 선택값이 없을 때는 임시 기본 캐릭터를 보여줍니다.
  const selectedCharacter = useMemo(
    () =>
      CHARACTER_IMAGES.find((character) => character.src === profileImageUrl) ??
      CHARACTER_IMAGES[0],
    [profileImageUrl]
  )

  const handleSelectCharacter = (id: string) => {
    const character = CHARACTER_IMAGES.find((item) => item.id === id)
    if (!character) return

    // 폼 값은 profile_image_url로 유지합니다. 추후 character.src는 백엔드 이미지 URL이 됩니다.
    setValue('profile_image_url', character.src, {
      shouldDirty: true,
      shouldValidate: true,
    })
    setIsOpen(false)
  }

  return (
    <div className="grid w-full grid-cols-[108px_1fr] items-center">
      <span className="text-sm">프로필 이미지</span>
      <Button
        className="w-fit bg-transparent p-0"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={selectedCharacter.src}
          alt={selectedCharacter.label}
          className="size-16 rounded-full object-contain"
        />
      </Button>

      {isOpen ? (
        <CharacterSelectModal
          onClose={() => setIsOpen(false)}
          onSelect={handleSelectCharacter}
        />
      ) : null}
    </div>
  )
}
