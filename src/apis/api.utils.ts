import type { ApiErrorResponse } from './api.types'

// error_detail은 string 또는 중첩 객체일 수 있음
// 예) "이미 신고한 게시글입니다." -> "이미 신고한 게시글입니다."
// 예) { vote: { non_field_errors: ["투표 입력값이 올바르지 않습니다."] } } -> "투표 입력값이 올바르지 않습니다."
// 이렇게 나와야함
// 재귀적으로 트리를 탐색하여 leaf 문자열만 수집
// - string -> 그대로 반환
// - array -> 각 요소를 재귀 처리
// - object -> 모든 값(value)을 재귀 처리 (key는 무시)
// - 그 외 -> 빈 배열 (null, number 등 예상 외 타입 방어)
function extractMessages(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(extractMessages)
  if (value !== null && typeof value === 'object') {
    return Object.values(value).flatMap(extractMessages)
  }
  return []
}

// API 에러 응답의 error_detail을 사용자에게 보여줄 문자열로 변환
// - string이면 그대로 반환
// - 객체면 extractMessages로 모든 메시지를 추출해 줄바꿈으로 합침.
export function formatError(
  errorDetail: ApiErrorResponse['error_detail']
): string {
  if (typeof errorDetail === 'string') return errorDetail
  return extractMessages(errorDetail).join('\n')
}
