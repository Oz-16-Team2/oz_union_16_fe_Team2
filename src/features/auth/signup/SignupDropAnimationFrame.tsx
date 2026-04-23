import type { PropsWithChildren } from 'react'

import { charOrange, charYellow } from '@/assets/images'
import { CharacterDropAnimationFrame } from '@/features/auth/character/CharacterDropAnimationFrame'
import type { CharacterEyeStatus } from '@/features/auth/character/eye/useCharacterEye'

type SignupDropAnimationFrameProps = PropsWithChildren<{
  isDropped: boolean
  eyeStatus?: CharacterEyeStatus
}>

export function SignupDropAnimationFrame({
  isDropped,
  eyeStatus,
  children,
}: SignupDropAnimationFrameProps) {
  return (
    <CharacterDropAnimationFrame
      isDropped={isDropped}
      eyeStatus={eyeStatus}
      leftCharacterSrc={charYellow}
      rightCharacterSrc={charOrange}
      leftCharacterClassName="w-30"
      rightCharacterClassName="w-34"
      leftEyeClassName="left-[49%] top-[28%] -translate-x-1/2"
      rightEyeClassName="left-1/2 top-[30%] -translate-x-1/2"
      leftPawClassName="bg-[#f6c547]"
      rightPawClassName="bg-[#ff8a3d]"
    >
      {children}
    </CharacterDropAnimationFrame>
  )
}
