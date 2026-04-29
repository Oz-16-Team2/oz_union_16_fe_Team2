import { useEffect, useState } from 'react'

export function useCharacterEntranceMotion() {
  const [isDropped, setIsDropped] = useState(false)
  const [isEntranceEyeActive, setIsEntranceEyeActive] = useState(true)
  const [isCompactMotion, setIsCompactMotion] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const compactMotionQuery = window.matchMedia('(max-width: 639px)')
    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    const syncMotionPreferences = () => {
      // sm 이하에서는 드롭 연출 대신 위에서 아래로 가볍게 내려오는 모션만 사용합니다.
      setIsCompactMotion(compactMotionQuery.matches)
      setPrefersReducedMotion(reducedMotionQuery.matches)
    }

    syncMotionPreferences()

    compactMotionQuery.addEventListener('change', syncMotionPreferences)
    reducedMotionQuery.addEventListener('change', syncMotionPreferences)

    return () => {
      compactMotionQuery.removeEventListener('change', syncMotionPreferences)
      reducedMotionQuery.removeEventListener('change', syncMotionPreferences)
    }
  }, [])

  useEffect(() => {
    // 로그인/회원가입 폼이 같은 타이밍으로 내려오고 같은 시간 동안 등장 눈을 유지하도록 공통화합니다.
    const dropTimer = window.setTimeout(
      () => {
        setIsDropped(true)
        setIsEntranceEyeActive(true)
      },
      prefersReducedMotion ? 0 : isCompactMotion ? 40 : 120
    )
    const entranceEyeTimer = window.setTimeout(
      () => setIsEntranceEyeActive(false),
      prefersReducedMotion ? 0 : isCompactMotion ? 700 : 1000
    )

    return () => {
      window.clearTimeout(dropTimer)
      window.clearTimeout(entranceEyeTimer)
    }
  }, [isCompactMotion, prefersReducedMotion])

  return {
    isDropped,
    isCompactMotion,
    isEntranceEyeActive,
    prefersReducedMotion,
  } as const
}
