import { Laptop, Moon, Sun } from 'lucide-react'

import { DarklogoImage, logoImage } from '@/assets/images'
import { useTheme } from '@/lib/theme/ThemeProvider'

const THEME_ICON = {
  light: Sun,
  dark: Moon,
  system: Laptop,
} as const

export default function Header() {
  const { theme, setTheme } = useTheme()

  const ThemeIcon = THEME_ICON[theme]

  const handleClickTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      return
    }

    if (theme === 'dark') {
      setTheme('system')
      return
    }

    setTheme('light')
  }

  return (
    <header className="max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between py-3 px-4">
        <img src={logoImage} className="w-12 dark:hidden" alt="OZ Union 로고" />
        <img
          src={DarklogoImage}
          className="hidden w-12 dark:block"
          alt="OZ Union 로고"
        />
        <div className="flex items-center gap-2">
          {/* TODO: 레이아웃 확정 후 로그인 상태와 공통 버튼 컴포넌트에 맞춰 헤더 props 분리 */}
          <button
            type="button"
            className="relative flex size-9 items-center justify-center"
            onClick={handleClickTheme}
            aria-label={`현재 테마: ${theme}`}
          >
            <ThemeIcon className="text-text-primary" />
          </button>

          <button className="text-lg">로그인</button>
        </div>
      </div>
    </header>
  )
}
