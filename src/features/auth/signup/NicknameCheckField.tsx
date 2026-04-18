import { useState } from 'react'
import {
  type Control,
  type FieldErrors,
  type UseFormRegister,
  useWatch,
} from 'react-hook-form'

import { Button } from '@/components/common/ui'
import type { SignupSchema } from '@/schemas/auth/signup'

import { FormField } from '../FormField'

type NicknameCheckFieldProps = {
  control: Control<SignupSchema>
  errors: FieldErrors<SignupSchema>
  register: UseFormRegister<SignupSchema>
}

export function NicknameCheckField({
  control,
  errors,
  register,
}: NicknameCheckFieldProps) {
  const nickname = useWatch({
    control,
    name: 'nickname',
  })
  // 중복확인 완료된 닉네임 저장
  const [checkedNickname, setCheckedNickname] = useState('')

  // 앞뒤 공백 제거한 값
  const normalizedNickname = nickname?.trim() ?? ''

  // 버튼 활성화 여부 (빈값 X, 공백 포함 X)
  const isValid =
    normalizedNickname.length > 0 && nickname === normalizedNickname

  // 중복확인 완료 여부
  const isChecked =
    normalizedNickname.length > 0 && checkedNickname === normalizedNickname

  return (
    <div className="relative">
      <FormField
        label="닉네임"
        id="signup-nickname"
        type="text"
        placeholder="닉네임을 입력해주세요"
        error={errors.nickname?.message}
        {...register('nickname', {
          validate: (value) => {
            if (value !== value.trim()) {
              return '앞뒤 공백은 사용할 수 없습니다'
            }
            return true
          },
        })}
      />

      <Button
        variant={'outline'}
        size="sm"
        className={`absolute right-2 bottom-2 disabled:opacity-15 ${
          isChecked ? 'bg-button-primary text-white' : 'bg-transparent'
        }`}
        disabled={!isValid}
        onClick={() => setCheckedNickname(normalizedNickname)}
      >
        {isChecked ? '사용가능' : '중복확인'}
      </Button>
    </div>
  )
}
