import type { HTMLAttributes } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center justify-center min-w-[68px] rounded-[9999px] px-[18px] py-[8px] text-[12px] font-semibold whitespace-nowrap',
  {
    variants: {
      variant: {
        success: 'bg-[#EAFBF3] text-[#75B965]',
        warning: 'bg-[#FFEEE2] text-[#FF5550]',
        error: 'bg-[#F1F0FF] text-[#845FFF]',
      },
    },
  }
)

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
