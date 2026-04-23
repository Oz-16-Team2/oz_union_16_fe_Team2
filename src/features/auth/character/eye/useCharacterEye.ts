import { useEffect, useState } from 'react'

export type CharacterEyeStatus =
  | 'idle'
  | 'email'
  | 'password'
  | 'error'
  | 'email-error'
  | 'password-error'
  | 'entrance'
  | 'look-away'
  | 'password-visible'

export type CharacterIdleGaze = 'front' | 'toward-center'

export const useCharacterEye = (status: CharacterEyeStatus = 'idle') => {
  const [isBlinking, setIsBlinking] = useState(false)
  const [idleGaze, setIdleGaze] = useState<CharacterIdleGaze>('front')
  const canBlink = status !== 'entrance'

  useEffect(() => {
    // 등장 표정은 짧은 연출이라 자동 깜빡임을 멈추고, 나머지 상태에서는 자연스럽게 깜빡입니다.
    if (!canBlink) {
      return
    }

    let blinkTimer: number | undefined
    let nextBlinkTimer: number | undefined

    const scheduleBlink = () => {
      const nextDelay = 2600 + Math.random() * 2600

      nextBlinkTimer = window.setTimeout(() => {
        setIsBlinking(true)

        blinkTimer = window.setTimeout(() => {
          setIsBlinking(false)
          scheduleBlink()
        }, 110)
      }, nextDelay)
    }

    scheduleBlink()

    return () => {
      if (nextBlinkTimer) window.clearTimeout(nextBlinkTimer)
      if (blinkTimer) window.clearTimeout(blinkTimer)
    }
  }, [canBlink])

  useEffect(() => {
    if (status !== 'idle') {
      return
    }

    // 아무 입력이 없을 때는 정면과 서로 보는 시선을 번갈아 보여 생동감을 만듭니다.
    const gazeTimer = window.setInterval(() => {
      setIdleGaze((prev) => (prev === 'front' ? 'toward-center' : 'front'))
    }, 4200)

    return () => {
      window.clearInterval(gazeTimer)
    }
  }, [status])

  return {
    idleGaze,
    isBlinking: canBlink && isBlinking,
    state: status,
  }
}
