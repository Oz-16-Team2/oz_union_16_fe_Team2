import { useEffect, useState } from 'react'

export function useAuthEntranceMotion() {
  const [isDropped, setIsDropped] = useState(false)
  const [isEntranceEyeActive, setIsEntranceEyeActive] = useState(true)

  useEffect(() => {
    // 로그인/회원가입 폼이 같은 타이밍으로 내려오고 같은 시간 동안 등장 눈을 유지하도록 공통화합니다.
    const dropTimer = window.setTimeout(() => {
      setIsDropped(true)
      setIsEntranceEyeActive(true)
    }, 120)
    const entranceEyeTimer = window.setTimeout(
      () => setIsEntranceEyeActive(false),
      1000
    )

    return () => {
      window.clearTimeout(dropTimer)
      window.clearTimeout(entranceEyeTimer)
    }
  }, [])

  return {
    isDropped,
    isEntranceEyeActive,
  } as const
}
