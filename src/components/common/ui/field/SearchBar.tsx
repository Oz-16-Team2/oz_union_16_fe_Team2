import { useState } from 'react'

import { Search } from 'lucide-react'

import { cn } from '@/utils/cn'

import { Input } from './Input'

export type SearchBarProps = {
  onSearch?: (value: string) => void
} & Omit<React.ComponentProps<'input'>, 'type'>

export function SearchBar({
  onSearch,
  className,
  onChange,
  placeholder = '검색',
  ...props
}: SearchBarProps) {
  const [value, setValue] = useState('')

  const handleSearch = () => {
    onSearch?.(value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    onChange?.(e)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className={cn('w-full', className, 'relative')}>
      <Input
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="rounded-full pr-10"
        {...props}
      />
      <button
        type="button"
        aria-label="검색"
        onClick={handleSearch}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
      >
        <Search size={20} />
      </button>
    </div>
  )
}
