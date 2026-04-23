// 백엔드 공통 에러 응답 형식은 두가지 타입
// - 필드 레벨: { error_detail: { sort_by: ["정렬 기준이 올바르지 않습니다."] } }
// - 단순 메시지: { error_detail: "해당하는 게시글이 없습니다." }
export type ApiErrorResponse = {
  error_detail: Record<string, string[]> | string
}
