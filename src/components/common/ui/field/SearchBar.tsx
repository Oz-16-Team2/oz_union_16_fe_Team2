import { useState } from 'react'

import { Search } from 'lucide-react'

import { cn } from '@/utils/cn'

import { Input } from './Input'

export type SearchBarProps = {
  onSearch?: (value: string) => void
} & Omit<React.ComponentProps<'input'>, 'type'>

// controlledValue 추가 해서 외부에서 값을 제어할 수 있게 함
// value: controlledValue로 변경
// controlledValue가 없으면 내부적으로 값을 관리하는 useState 사용

export function SearchBar({
  value: controlledValue,
  onSearch,
  className,
  onChange,
  placeholder = '검색',
  ...props
}: SearchBarProps) {
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState('')
  const value = isControlled ? (controlledValue as string) : internalValue

  const handleSearch = () => {
    onSearch?.(value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value)
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
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-text-muted hover:text-text-primary cursor-pointer"
      >
        <Search size={20} />
      </button>
    </div>
  )
}
