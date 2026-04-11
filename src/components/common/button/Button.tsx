import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1 font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:bg-[var(--color-gray-400)]',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--color-button-primary-bg)] text-[var(--color-button-primary-text)] hover:bg-[var(--color-button-primary-hover)]',

        secondary:
          'bg-[var(--color-button-secondary-bg)] text-[var(--color-button-secondary-text)] hover:bg-[var(--color-button-secondary-hover)]',

        danger:
          'bg-[var(--color-button-danger-bg)] text-[var(--color-button-danger-text)] hover:bg-[var(--color-button-danger-hover)]',

        neutral:
          'bg-[var(--color-gray-200)] text-[var(--color-text-primary)] hover:bg-[var(--color-gray-300)]',

        dark: 'bg-[var(--color-gray-900)] text-[var(--color-white)] hover:bg-[var(--color-gray-950)]',

        outline:
          'border border-[var(--color-border-subtle)] bg-[var(--color-white)] text-[var(--color-text-muted)]',

        textDanger:
          'bg-transparent text-[var(--color-danger-500)] hover:bg-[var(--color-danger-100)]',

        textPrimary:
          'bg-transparent text-[var(--color-primary-500)] hover:text-[var(--color-primary-600)]',
      },

      size: {
        sm: 'px-4 py-1 text-xs',
        md: 'px-4 py-1.5 text-sm',
      },

      rounded: {
        default: 'rounded-lg',
        pill: 'rounded-full',
      },

      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },

    defaultVariants: {
      variant: 'primary',
      size: 'md',
      rounded: 'default',
      fullWidth: false,
    },
  }
)

export type ButtonProps = {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      fullWidth,
      leftIcon,
      rightIcon,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          buttonVariants({ variant, size, rounded, fullWidth }),
          className
        )}
        {...props}
      >
        {leftIcon ? <span className="shrink-0">{leftIcon}</span> : null}
        {children}
        {rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
