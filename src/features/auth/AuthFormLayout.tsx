import { type ComponentProps, type ReactNode } from 'react'
import {
  type FieldValues,
  FormProvider,
  type UseFormReturn,
} from 'react-hook-form'
import { useNavigate } from 'react-router'

import { DarklogoImage, logoImage } from '@/assets/images'
import { Button } from '@/components/common/ui'
import { cn } from '@/utils/cn'

import { AuthForm } from './AuthForm'

type AuthFormLayoutProps<TFieldValues extends FieldValues> = {
  methods: UseFormReturn<TFieldValues>
  title: string
  description: string
  children: ReactNode
  className?: string
  formClassName?: string
} & Pick<ComponentProps<'form'>, 'onSubmit'>

export function AuthFormLayout<TFieldValues extends FieldValues>({
  methods,
  title,
  description,
  children,
  className,
  formClassName,
  onSubmit,
}: AuthFormLayoutProps<TFieldValues>) {
  const navigate = useNavigate()

  return (
    <div
      className={cn(
        'space-y-12 rounded-4xl border border-border-default bg-white/25 dark:bg-neutral-900/30 backdrop-blur-lg px-14 py-12 shadow-2xl relative',
        className
      )}
    >
      <div className="flex flex-col items-center gap-2.5">
        <Button
          title="홈으로 이동"
          variant="ghost"
          className="p-0 h-auto hover:bg-transparent gap-3 cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
          onClick={() => navigate('/')}
        >
          <img src={logoImage} alt="logo" className="h-11 dark:hidden" />
          <img
            src={DarklogoImage}
            alt="logo"
            className="hidden h-11 dark:block"
          />

          <h1 className="text-center text-2xl font-semibold text-neutral-900 dark:text-white">
            {title}
          </h1>
        </Button>

        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          {description}
        </span>
      </div>

      <FormProvider {...methods}>
        <AuthForm
          className={cn('mt-8 space-y-5', formClassName)}
          onSubmit={onSubmit}
        >
          {children}
        </AuthForm>
      </FormProvider>
    </div>
  )
}
