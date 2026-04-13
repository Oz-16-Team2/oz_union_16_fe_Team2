import { useRef } from 'react'

import { Search } from 'lucide-react'

import { Input } from '@/components/common/ui/field/Input'
import { cn } from '@/utils/cn'

export type SearchBarProps = {
  onSearch?: (value: string) => void
} & Omit<React.ComponentProps<'input'>, 'type'>

export function SearchBar({
  onSearch,
  className,
  placeholder = '검색',
  ...props
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(e.currentTarget.value)
    }
  }

  const handleClickSearch = () => {
    if (inputRef.current) {
      onSearch?.(inputRef.current.value)
    }
  }

  return (
    <div className={cn('w-full', className, 'relative')}>
      <Input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="rounded-full pr-10"
        {...props}
      />
      <button
        type="button"
        aria-label="검색"
        onClick={handleClickSearch}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
      >
        <Search size={20} />
      </button>
    </div>
  )
}
