import * as React from 'react'

import type { VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/cn'

import { buttonVariants } from './Button.style'

type ButtonProps = {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
} & React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

export default function Button({
  className,
  variant,
  size,
  rounded,
  leftIcon,
  rightIcon,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size, rounded }), className)}
      {...props}
    >
      {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
      {children}
      {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
    </button>
  )
}
