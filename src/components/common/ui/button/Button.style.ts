import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1 px-4 font-medium cursor-pointer transition-colors focus:outline-none disabled:pointer-events-none disabled:bg-gray-400 disabled:text-white dark:disabled:bg-white/25 dark:disabled:text-white/40',
  {
    variants: {
      variant: {
        primary:
          'bg-button-primary-bg text-button-primary-text hover:bg-button-primary-hover',

        secondary:
          'bg-button-secondary-bg text-button-secondary-text hover:bg-button-secondary-hover',

        danger:
          'bg-button-danger-bg text-button-danger-text hover:bg-button-danger-hover',

        neutral: 'bg-gray-200 text-text-primary hover:bg-gray-300',

        outline: 'border border-border-subtle bg-gray-100 text-text-muted',

        ghost: 'bg-transparent text-text-muted hover:bg-gray-100',

        modal:
          'bg-button-modal-cancel-bg text-white hover:bg-button-modal-cancel-hover',

        submit: 'bg-gray-400 text-white hover:bg-button-primary-bg',
      },

      size: {
        sm: 'py-1 text-xs',
        md: 'py-1.5 text-sm',
        lg: 'py-2 text-base',
      },

      rounded: {
        md: 'rounded-md',
        full: 'rounded-full',
        lg: 'rounded-lg',
      },
    },

    defaultVariants: {
      variant: 'primary',
      size: 'md',
      rounded: 'md',
    },
  }
)
