import { type ComponentProps, type ReactNode, useId } from 'react'
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from 'react-hook-form'

import { Input } from '@/components/common/ui'
import { cn } from '@/utils/cn'

type AuthFormProps = {
  className?: string
  children: ReactNode
} & ComponentProps<'form'>

/*
 * 공통 인증 폼 (로그인 / 회원가입 공통)
 * FormProvider는 각 페이지에서 감싸고, 여기서는 레이아웃만 담당합니다.
 */
function AuthForm({ className, children, ...props }: AuthFormProps) {
  return (
    <form className={cn('space-y-8 mt-8 w-full', className)} {...props}>
      {children}
    </form>
  )
}

// 컴파운드 패턴: AuthForm 내부에서 사용하는 FormField 컴포넌트
// - AuthForm.FormField 형태로 사용하기 위해 정의
// - label + input + error를 하나로 묶은 공통 필드 UI
// - FormProvider 아래에서 useFormContext로 필드를 등록
type FormFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  label?: string
} & Omit<ComponentProps<'input'>, 'name'>

function FormField<TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  control,
  children,
  ...props
}: FormFieldProps<TFieldValues>) {
  // FormProvider 안에서 register와 에러 상태를 가져옵니다.
  const { fieldState, field } = useController({
    name,
    control,
  })

  // id가 없으면 label 연결용 고유 id를 생성합니다.
  const id = useId()

  return (
    <div
      className={cn(
        label ? 'grid grid-cols-[108px_1fr] items-center' : 'block',
        'w-full'
      )}
    >
      {label && (
        <label htmlFor={id} className="text-sm">
          {label}
        </label>
      )}

      <div className="flex flex-col gap-1 w-full">
        <div className="relative w-full">
          <Input
            id={id}
            {...field}
            className={cn(
              'placeholder:text-sm py-1 px-1.5 w-full rounded-none border-t-0 border-x-0 border-border-strong bg-transparent',
              children && 'pr-24',
              props.className
            )}
            {...props}
          />
          {children && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              {children}
            </div>
          )}
        </div>
        {fieldState.error?.message && (
          <p className="text-xs text-red-500">{fieldState.error?.message}</p>
        )}
      </div>
    </div>
  )
}
// 컴파운드 패턴: AuthForm 안에 FormField를 속성으로 붙여서 같이 사용하도록 구성
AuthForm.FormField = FormField

export { AuthForm }
