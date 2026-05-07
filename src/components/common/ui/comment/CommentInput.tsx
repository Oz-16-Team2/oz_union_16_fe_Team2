import { useState } from 'react'

import { User } from 'lucide-react'

import { Button } from '@/components/common/ui/button/Button'
import { Textarea } from '@/components/common/ui/field/Textarea'

type CommentInputProps = {
  onSubmit: (content: string) => void
  maxLength?: number
  isLoading?: boolean
  disabled?: boolean
  placeholder?: string
  profileImageUrl?: string | null
  nickname?: string
}

export function CommentInput({
  onSubmit,
  maxLength = 500,
  isLoading = false,
  disabled = false,
  placeholder = '댓글을 입력해주세요',
  profileImageUrl,
  nickname,
}: CommentInputProps) {
  const [value, setValue] = useState('')

  const isDisabled = disabled || value.trim().length === 0 || isLoading

  const handleSubmit = () => {
    if (isDisabled) return

    onSubmit(value.trim())
    setValue('')
  }

  return (
    <div className="flex items-start gap-3 sm:gap-4 sm:pl-4">
      {/* 프로필 */}
      <div className="flex h-20 items-center">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-surface">
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt={nickname ? `${nickname}의 프로필 이미지` : '프로필 이미지'}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-text-muted dark:bg-white/10">
              <User size={22} />
            </div>
          )}
        </div>
      </div>

      {/* 입력 영역 */}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="relative">
          <Textarea
            disabled={disabled}
            className="h-20 min-h-20 max-h-30 overflow-y-auto bg-gray-100 pr-16 pb-7 disabled:bg-gray-200 disabled:text-text-muted disabled:placeholder:text-gray-400 disabled:opacity-100 dark:border-white/15 dark:bg-white/5 dark:disabled:bg-white/5"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
          />

          <span className="absolute right-6 bottom-2 text-xs text-text-muted">
            {value.length}/{maxLength}
          </span>
        </div>

        <div className="mt-1 flex justify-end">
          <Button
            variant="primary"
            size="sm"
            rounded="full"
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            등록
          </Button>
        </div>
      </div>
    </div>
  )
}
