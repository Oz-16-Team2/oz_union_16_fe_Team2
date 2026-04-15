import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { cn } from '@/utils/cn'

export type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

const PAGE_WINDOW_SIZE = 10

const BTN_BASE =
  'flex h-6 w-6 items-center justify-center rounded-md transition-colors cursor-pointer sm:h-8 sm:w-8'

const BTN_ENABLED =
  'text-text-primary hover:bg-primary-100 hover:text-primary-500'

const BTN_CHEVRON_DISABLED = 'cursor-not-allowed text-gray-400'

const BTN_PAGE_ACTIVE = 'bg-primary-100 font-semibold text-primary-500'

// 페이지네이션 범위를 정하는 함수 => util 함수가 1개라 일단 Pagination에 같이 보관
// CASE 1. currentPage가 1 , totalPage가 20 일때
function getPageRange(currentPage: number, totalPages: number): number[] {
  // 시작점 계산 start = Math.max(1, Math.min(-4, 9)) => 1
  const start = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(PAGE_WINDOW_SIZE / 2),
      totalPages - PAGE_WINDOW_SIZE + 1
    )
  )
  // 끝나는 지점 계산 end = Math.min(20, 10) => 10
  const end = Math.min(totalPages, start + PAGE_WINDOW_SIZE - 1)
  // start + i 부터 연속된 10개 숫자 배열 생성
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const pages = getPageRange(currentPage, totalPages)
  const isPrevDisabled = currentPage <= 1
  const isNextDisabled = currentPage >= totalPages

  return (
    <nav
      aria-label="페이지 탐색 페이지네이션"
      className={cn('flex items-center gap-1.5', className)}
    >
      <button
        type="button"
        aria-label="첫 페이지"
        disabled={isPrevDisabled}
        onClick={() => onPageChange(1)}
        className={cn(
          BTN_BASE,
          isPrevDisabled ? BTN_CHEVRON_DISABLED : BTN_ENABLED
        )}
      >
        <ChevronsLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      <button
        type="button"
        aria-label="이전 페이지"
        disabled={isPrevDisabled}
        onClick={() => onPageChange(currentPage - 1)}
        className={cn(
          BTN_BASE,
          isPrevDisabled ? BTN_CHEVRON_DISABLED : BTN_ENABLED
        )}
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          aria-label={`${page} 페이지`}
          aria-current={page === currentPage ? 'page' : undefined}
          onClick={() => onPageChange(page)}
          className={cn(
            BTN_BASE,
            'text-sm sm:text-base',
            page === currentPage ? BTN_PAGE_ACTIVE : BTN_ENABLED
          )}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        aria-label="다음 페이지"
        disabled={isNextDisabled}
        onClick={() => onPageChange(currentPage + 1)}
        className={cn(
          BTN_BASE,
          isNextDisabled ? BTN_CHEVRON_DISABLED : BTN_ENABLED
        )}
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      <button
        type="button"
        aria-label="마지막 페이지"
        disabled={isNextDisabled}
        onClick={() => onPageChange(totalPages)}
        className={cn(
          BTN_BASE,
          isNextDisabled ? BTN_CHEVRON_DISABLED : BTN_ENABLED
        )}
      >
        <ChevronsRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </nav>
  )
}
