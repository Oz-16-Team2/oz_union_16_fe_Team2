import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'

import { useAuthStore } from '@/store/authStore'

import type { PostSortOrder } from './PostList.types'

/**
 * 게시글 목록의 필터링 상태와 API 호출 모드를 관리하는 커스텀 훅
 *
 * 상태 레이어:
 * - inputValue      : SearchBar에 표시되는 값 (즉시 반응)
 * - debouncedKeyword: API 호출 모드 결정에 사용되는 값 (로컬, 즉시 제어 가능)
 * - URL keyword     : 새로고침 시 검색어 복원을 위한 영속 상태
 *
 * debouncedKeyword를 로컬 state로 직접 관리하는 이유:
 * - mode를 URL keyword 기준으로 결정하면, setInputValue(로컬)와 setSearchParams(URL)가
 *   별도의 렌더를 유발할 때 중간 렌더에서 의도치 않은 검색 요청이 발생할 수 있음
 * - 로컬 state는 같은 이벤트 핸들러 내에서 항상 배칭되므로 이 문제가 없음
 */
export function usePostListFilters() {
  const { user, authStatus } = useAuthStore()
  const [searchParams, setSearchParams] = useSearchParams()

  // URL에서 현재 상태 추출
  const keyword = searchParams.get('keyword') ?? ''
  const rawSort = searchParams.get('sort')

  /**
   * 정렬 상태 결정
   * - 비로그인 유저가 'suggested'에 접근하면 'latest'로 취급 (세션 확인 완료 후)
   */
  const sort: PostSortOrder = useMemo(() => {
    if (rawSort === 'trending') return 'trending'
    if (rawSort === 'suggested') {
      // 세션 확인 중에는 일단 요청을 허용 (로그인 유저일 가능성)
      // 확인 결과 비로그인이면 latest로 강제 전환
      return authStatus === 'restored' && !user ? 'latest' : 'suggested'
    }
    return 'latest'
  }, [rawSort, authStatus, user])

  const page = Number(searchParams.get('page')) || 1

  // SearchBar 표시용 (즉시 반응)
  const [inputValue, setInputValue] = useState(keyword)

  // API 모드 결정용 (로컬, 즉시 제어 가능)
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword)

  /**
   * URL 파라미터를 통합적으로 업데이트
   * - 값이 없는 파라미터는 제거하여 URL을 깔끔하게 유지
   */
  const updateParams = useCallback(
    (updates: Record<string, string | number | undefined | null>) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          Object.entries(updates).forEach(([key, value]) => {
            if (!value) next.delete(key)
            else next.set(key, String(value))
          })
          return next
        },
        { replace: true }
      )
    },
    [setSearchParams]
  )

  /**
   * URL keyword가 외부에서 변경될 때 (뒤로가기, 직접 URL 입력 등)
   * inputValue와 debouncedKeyword를 동기화
   */
  useEffect(() => {
    setInputValue(keyword)
    setDebouncedKeyword(keyword)
  }, [keyword])

  /**
   * 비로그인 유저가 'suggested' URL로 진입한 경우 URL 동기화
   */
  useEffect(() => {
    if (
      authStatus === 'restored' &&
      !user &&
      searchParams.get('sort') === 'suggested'
    ) {
      updateParams({ sort: 'latest' })
    }
  }, [authStatus, user, searchParams, updateParams])

  /**
   * 타이핑 디바운스: inputValue → debouncedKeyword + URL을 500ms 후 동시 업데이트
   * - debouncedKeyword가 먼저 바뀌어 API 요청이 나가고
   * - URL도 함께 업데이트되어 새로고침 시 검색어가 복원됨
   */
  useEffect(() => {
    if (inputValue === keyword) return
    const timer = setTimeout(() => {
      setDebouncedKeyword(inputValue)
      updateParams({ keyword: inputValue, page: 1 })
    }, 500)
    return () => clearTimeout(timer)
  }, [inputValue, keyword, updateParams])

  /**
   * API 호출 모드 결정 — URL keyword가 아닌 debouncedKeyword 기준
   * → 탭 전환 시 debouncedKeyword를 즉시 초기화하면 검색 요청 없이 바로 전환됨
   */
  const mode = useMemo(() => {
    if (debouncedKeyword.trim()) {
      return {
        type: 'search' as const,
        keyword: debouncedKeyword,
        page,
      }
    }
    if (sort === 'trending') {
      return { type: 'trending' as const, page }
    }
    if (sort === 'suggested') {
      return { type: 'suggested' as const, page }
    }
    return { type: 'latest' as const, page }
  }, [debouncedKeyword, sort, page])

  /** 엔터/버튼 클릭 시 즉시 반영 (디바운스 대기 없음) */
  const handleSearch = (newKeyword: string) => {
    setInputValue(newKeyword)
    setDebouncedKeyword(newKeyword)
    updateParams({ keyword: newKeyword, page: 1 })
  }

  /**
   * 정렬 탭 전환 시 debouncedKeyword를 즉시 초기화
   * → mode가 즉시 latest/trending으로 전환되어 불필요한 검색 요청이 발생하지 않음
   */
  const handleSortChange = (newSort: PostSortOrder) => {
    setDebouncedKeyword('')
    updateParams({ sort: newSort, keyword: '', page: 1 })
  }

  const handlePageChange = useCallback(
    (newPage: number) => updateParams({ page: newPage }),
    [updateParams]
  )

  return {
    filters: { keyword, sort, page },
    mode,
    inputValue,
    setInputValue,
    handleSearch,
    handleSortChange,
    handlePageChange,
  }
}
