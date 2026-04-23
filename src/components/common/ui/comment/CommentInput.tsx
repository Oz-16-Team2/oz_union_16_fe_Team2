import { useState } from 'react'

import { Button } from '@/components/common/ui/button/Button'
import { Textarea } from '@/components/common/ui/field/Textarea'

type CommentInputProps = {
  onSubmit: (content: string) => void
  maxLength?: number
  isLoading?: boolean
  placeholder?: string
  profileImageUrl?: string | null
  nickname?: string
}

export function CommentInput({
  onSubmit,
  maxLength = 500,
  isLoading = false,
  placeholder = '댓글을 입력해주세요',
  profileImageUrl,
  nickname,
}: CommentInputProps) {
  const [value, setValue] = useState('')

  const isDisabled = value.trim().length === 0 || isLoading

  const handleSubmit = () => {
    if (isDisabled) return

    onSubmit(value.trim())
    setValue('')
  }

  return (
    <div className="flex gap-3">
      {/* 프로필 (나중에 사용자 정보로 교체 가능) */}
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200">
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt={nickname ? `${nickname}의 프로필 이미지` : '프로필 이미지'}
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>

      {/* 입력 영역 */}
      <div className="flex flex-1 flex-col gap-2">
        <Textarea
          className="bg-gray-100 focus:bg-white"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
        />

        {/* 하단 영역 */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-muted">
            {value.length}/{maxLength}
          </span>
          <Button
            variant="submit"
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
