import type { CharacterEyeStatus } from '@/features/auth/character/eye/useCharacterEye'

type NullableField = string | null

type UseCharacterEyeStatusParams<TField extends NullableField> = {
  emailFields: readonly Exclude<TField, null>[]
  errorTargetField: TField | null
  focusedField: TField | null
  hasError: boolean
  isDropped: boolean
  isEntranceEyeActive: boolean
  passwordFields: readonly Exclude<TField, null>[]
  lastFocusedField: TField | null
}

export function useCharacterEyeStatus<TField extends NullableField>({
  emailFields,
  errorTargetField,
  focusedField,
  hasError,
  isDropped,
  isEntranceEyeActive,
  passwordFields,
  lastFocusedField,
}: UseCharacterEyeStatusParams<TField>): CharacterEyeStatus {
  const eyeTargetField = errorTargetField ?? focusedField ?? lastFocusedField
  const focusedNonNullField =
    focusedField === null ? null : (focusedField as Exclude<TField, null>)
  const eyeTargetNonNullField =
    eyeTargetField === null ? null : (eyeTargetField as Exclude<TField, null>)
  const isPasswordFieldFocused =
    focusedNonNullField !== null && passwordFields.includes(focusedNonNullField)
  const isPasswordTarget =
    eyeTargetNonNullField !== null &&
    passwordFields.includes(eyeTargetNonNullField)
  const isEmailTarget =
    eyeTargetNonNullField !== null &&
    emailFields.includes(eyeTargetNonNullField)
  const isEmailFieldFocused =
    focusedNonNullField !== null && emailFields.includes(focusedNonNullField)

  // 비밀번호 입력 중에는 에러 유무와 무관하게 시선을 피하고,
  // 그 외에는 에러 필드를 먼저 바라보도록 공통화합니다.
  if (isPasswordFieldFocused) {
    return 'look-away'
  }

  if (hasError) {
    if (isPasswordTarget) return 'password-error'
    if (isEmailTarget) return 'email-error'
    return 'error'
  }

  if (isEmailFieldFocused) {
    return 'email'
  }

  if (!isDropped || isEntranceEyeActive) {
    return 'entrance'
  }

  return 'idle'
}
