import { Toaster, type ToasterProps } from 'sonner'

export function GlobalToast({
  position = 'top-center',
  richColors = true,
  duration = 3000,
  ...props
}: ToasterProps) {
  return (
    <Toaster
      position={position}
      richColors={richColors}
      duration={duration}
      {...props}
    />
  )
}
