import { useState } from 'react'

export function usePasswordVisibility(initialVisible = false) {
  const [isVisible, setIsVisible] = useState(initialVisible)

  const toggleVisibility = () => {
    // 로그인/회원가입 비밀번호 표시 토글에서 같은 상태 전환 로직을 재사용합니다.
    setIsVisible((prev) => !prev)
  }

  return {
    inputType: isVisible ? 'text' : 'password',
    isVisible,
    toggleVisibility,
  } as const
}
