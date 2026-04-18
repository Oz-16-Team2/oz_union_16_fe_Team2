/*
 *  회원가입 / 로그인 공통 폼필드 사용
 */

import { type ComponentProps, useId } from 'react'

import { Input } from '@/components/common/ui'
import { cn } from '@/utils/cn'

type FormFieldProps = {
  label?: string
  id?: string
  error?: string
} & ComponentProps<'input'>

export function FormField({
  label,
  id,
  error,
  className,
  ...props
}: FormFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div
      className={cn(
        label ? 'grid grid-cols-[108px_1fr] items-center' : 'block',
        'w-full'
      )}
    >
      {label && (
        <label htmlFor={inputId} className="text-sm">
          {label}
        </label>
      )}
      <Input
        id={inputId}
        error={Boolean(error)}
        errorMessage={error}
        className={cn(
          'placeholder:text-sm py-1 px-1.5 w-full rounded-none border-t-0 border-x-0 border-border-strong bg-transparent',
          className
        )}
        {...props}
      />
    </div>
  )
}
