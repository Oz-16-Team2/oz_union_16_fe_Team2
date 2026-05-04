import { useNavigate } from 'react-router'

import { Laptop, Moon, Sun } from 'lucide-react'

import { DarklogoImage, logoImage } from '@/assets/images'
import { ActionMenu } from '@/components/common/overlay'
import { Button } from '@/components/common/ui'
import { useTheme } from '@/lib/theme/ThemeProvider'
import { useLogoutMutation } from '@/query/auth'
import { useAuthStore } from '@/store/authStore'

const THEME_META = {
  light: { label: '라이트 테마', display: 'Light', Icon: Sun },
  dark: { label: '다크 테마', display: 'Dark', Icon: Moon },
  system: { label: '시스템 테마', display: 'System', Icon: Laptop },
} as const

export function Header() {
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logoutMutation = useLogoutMutation()
  const { label, display, Icon } = THEME_META[theme]

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

  const handleLogout = () => {
    // 로그아웃은 서버 쿠키 정리까지 끝내야 해서
    // 로컬 상태를 바로 지우지 않고 실제 API 호출을 먼저 보냅니다.
    logoutMutation.mutate()
  }

  return (
    <header className="max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between py-3 px-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          aria-label="메인페이지로 이동"
        >
          <img
            src={logoImage}
            className="w-12 h-11 dark:hidden"
            alt=""
            aria-hidden="true"
          />
          <img
            src={DarklogoImage}
            className="hidden w-12 h-11 dark:block"
            alt=""
            aria-hidden="true"
          />
        </button>
        <div className="flex items-center gap-6">
          <Button
            variant={'ghost'}
            rounded={'full'}
            onClick={handleClickTheme}
            aria-label={`${label} 사용 중. 클릭하면 다음 테마로 변경됩니다.`}
            className="relative h-9 w-9 justify-center border border-border-default bg-transparent p-0 text-text-primary transition-shadow duration-300 hover:bg-transparent shadow-card-main sm:w-auto sm:justify-start sm:pl-4 sm:pr-12"
          >
            <span className="hidden text-sm font-medium leading-none sm:inline">
              {display}
            </span>
            <span className="absolute right-0 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/30 text-text-primary backdrop-blur-md shadow-[0_3px_10px_rgba(151,151,151,0.18),inset_0_1px_2px_rgba(255,255,255,0.8)] transition-transform duration-300 hover:scale-110 dark:border-white/15 dark:bg-white/5 dark:shadow-[0_10px_30px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.55),inset_0_-1px_2px_rgba(255,255,255,0.12)]">
              <Icon className="size-4.5" aria-hidden="true" />
            </span>
          </Button>

          {user ? (
            <ActionMenu
              className="flex items-center"
              menuClassName="min-w-35 top-10 border border-border-default"
              align="right"
              items={[
                { label: '마이페이지', onClick: () => navigate('/mypage') },
                {
                  label: '북마크',
                  onClick: () => navigate('/mypage/bookmarks'),
                },
                {
                  label: '내가 쓴 게시글',
                  onClick: () => navigate('/mypage/posts'),
                },
                { label: '로그아웃', onClick: handleLogout },
              ]}
              trigger={
                <div className="flex items-center gap-2">
                  <img
                    src={user.profileImageUrl}
                    alt={`${user.nickname} 프로필`}
                    className="size-8 rounded-full object-cover"
                  />

                  <span className="max-w-24 truncate text-sm font-medium leading-none">
                    {user.nickname}
                  </span>
                </div>
              }
            />
          ) : (
            <Button
              variant="ghost"
              onClick={() => navigate('/login')}
              rounded="full"
              className="h-9 bg-transparent px-0 py-0 text-sm text-text-primary hover:bg-transparent hover:text-primary-600 dark:hover:text-primary-400"
            >
              로그인
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
