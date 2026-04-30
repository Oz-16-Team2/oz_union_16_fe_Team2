import type { ApiErrorResponse } from './api.types'

export function formatError(
  errorDetail: ApiErrorResponse['error_detail']
): string {
  if (typeof errorDetail === 'string') {
    return errorDetail
  }
  return Object.values(errorDetail).flat().join('\n')
}
