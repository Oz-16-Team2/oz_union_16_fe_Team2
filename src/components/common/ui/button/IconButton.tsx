import * as React from 'react'

type IconButtonProps = {
  icon: React.ReactNode
  'aria-label': string
} & Omit<React.ComponentProps<'button'>, 'children'>

export default function IconButton({
  icon,
  className,
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button type={type} className={className} {...props}>
      {icon}
    </button>
  )
}
