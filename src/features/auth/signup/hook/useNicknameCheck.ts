import { useEffect, useRef } from 'react'
import { type UseFormReturn, useWatch } from 'react-hook-form'

import { useCheckNicknameMutation } from '@/query/auth'
import type { SignupFormSchema } from '@/schemas/auth/authForm.schema'

export function useNicknameCheck(methods: UseFormReturn<SignupFormSchema>) {
  const { clearErrors, control, getValues, setError, setValue } = methods
  const nickname = useWatch({ control, name: 'nickname' })
  const mutation = useCheckNicknameMutation()
  const isFirstNicknameRender = useRef(true)

  const isChecked =
    mutation.isSuccess && mutation.variables?.nickname === nickname

  // 닉네임을 수정하면 이전 서버 에러 메시지만 지웁니다.
  useEffect(() => {
    if (isFirstNicknameRender.current) {
      isFirstNicknameRender.current = false
      return
    }

    clearErrors('nickname')

    if (mutation.isSuccess && mutation.variables?.nickname !== nickname) {
      // 사용가능 확인을 받은 뒤 닉네임을 다시 바꾸면 재확인이 필요합니다.
      setError('nickname', {
        type: 'manual',
        message: '중복확인을 해주세요',
      })
    }
  }, [
    clearErrors,
    mutation.isSuccess,
    mutation.variables?.nickname,
    nickname,
    setError,
  ])

  const check = async () => {
    // 앞뒤 공백은 닉네임으로 쓰지 않도록 폼 값과 API 요청값을 같은 값으로 맞춥니다.
    const trimmedNickname = getValues('nickname').trim()

    setValue('nickname', trimmedNickname, {
      shouldDirty: true,
      shouldValidate: false,
    })

    // 중복확인 버튼에서는 중복확인 완료 여부가 아니라 닉네임 입력값만 먼저 확인합니다.
    if (!trimmedNickname) {
      setError('nickname', {
        type: 'manual',
        message: '닉네임을 입력해주세요',
      })
      return
    }

    mutation.mutate(
      { nickname: trimmedNickname },
      {
        onSuccess: () => {
          clearErrors('nickname')
        },
        onError: (error) => {
          setError('nickname', {
            type: 'server',
            message:
              error.response?.data?.error_detail.nickname?.[0] ??
              '닉네임 확인에 실패했습니다.',
          })
        },
      }
    )
  }

  return {
    check,
    isChecked,
    isPending: mutation.isPending,
  }
}
