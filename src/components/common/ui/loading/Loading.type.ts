export type LoadingSize = 'sm' | 'md' | 'lg'

export type LoadingProps = {
  size?: LoadingSize
  label?: string
  showLabel?: boolean
  fullScreen?: boolean
} & React.ComponentProps<'div'>
