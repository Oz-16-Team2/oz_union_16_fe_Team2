const MINUTE = 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const WEEK = DAY * 7
const MONTH = DAY * 30
const YEAR = DAY * 365

/**
 * 서버에서 받은 KST 날짜 문자열을 상대 시간으로 변환합니다.
 * 예: "2026-04-27 14:54:10" → "3분 전"
 */
export function formatRelativeTime(dateStr?: string): string {
  if (!dateStr) return '방금 전'

  const past = new Date(dateStr)
  if (Number.isNaN(past.getTime())) return '방금 전'

  const diffSeconds = Math.floor((Date.now() - past.getTime()) / 1000)

  if (diffSeconds < MINUTE) return '방금 전'
  if (diffSeconds < HOUR) return `${Math.floor(diffSeconds / MINUTE)}분 전`
  if (diffSeconds < DAY) return `${Math.floor(diffSeconds / HOUR)}시간 전`
  if (diffSeconds < WEEK) return `${Math.floor(diffSeconds / DAY)}일 전`
  if (diffSeconds < MONTH) return `${Math.floor(diffSeconds / WEEK)}주 전`
  if (diffSeconds < YEAR) return `${Math.floor(diffSeconds / MONTH)}달 전`
  return `${Math.floor(diffSeconds / YEAR)}년 전`
}
