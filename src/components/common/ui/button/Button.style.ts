import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1 px-4 font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:bg-gray-400 disabled:text-white',
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
      },

      size: {
        sm: 'py-1 text-xs',
        md: 'py-1.5 text-sm',
      },

      rounded: {
        md: 'rounded-md',
        full: 'rounded-full',
      },
    },

    defaultVariants: {
      variant: 'primary',
      size: 'md',
      rounded: 'md',
    },
  }
)
