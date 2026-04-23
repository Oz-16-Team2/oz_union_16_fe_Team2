import { Button } from '@/components/common/ui'

type PasswordVisibilityButtonProps = {
  isVisible: boolean
  onToggle: () => void
}

const OpenEyes = () => (
  <svg width="30" height="20" viewBox="0 0 48 24" className="text-black">
    <circle
      cx="12"
      cy="12"
      r="8"
      className="fill-white dark:fill-neutral-300"
    />
    <circle cx="12" cy="12" r="3.5" fill="currentColor" />
    <circle cx="13.5" cy="10.5" r="1" fill="white" />
    <path
      d="M9 6 L10.5 4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M12 5.5 L12 3.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M15 6 L13.5 4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    <circle
      cx="36"
      cy="12"
      r="8"
      className="fill-white dark:fill-neutral-200"
    />
    <circle cx="36" cy="12" r="3.5" fill="currentColor" />
    <circle cx="37.5" cy="10.5" r="1" fill="white" />
    <path
      d="M33 6 L34.5 4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M36 5.5 L36 3.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M39 6 L37.5 4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
)
const CloseEyes = () => (
  <svg
    width="30"
    height="24"
    viewBox="0 0 48 24"
    className="text-black dark:text-white"
  >
    {/* 닫힌 눈 곡선 바깥쪽에 짧은 속눈썹을 더해 이미지 레퍼런스처럼 보이게 합니다. */}
    <path
      d="M6 12 Q12 18 18 12"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path
      d="M30 12 Q36 18 42 12"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path
      d="M8 14 L4 18"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M13 17 L11 21"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M40 14 L44 18"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M35 17 L37 21"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
)

export function PasswordVisibilityButton({
  isVisible,
  onToggle,
}: PasswordVisibilityButtonProps) {
  return (
    <Button
      type="button"
      aria-label={isVisible ? '비밀번호 숨기기' : '비밀번호 표시'}
      aria-pressed={isVisible}
      className="size-8 bg-transparent p-0 hover:bg-transparent"
      onClick={onToggle}
    >
      <div className="flex items-center justify-center">
        {isVisible ? <OpenEyes /> : <CloseEyes />}
      </div>
    </Button>
  )
}
