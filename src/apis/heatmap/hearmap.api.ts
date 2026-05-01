import { apiClient } from '@/apis/apiClient'
import type {
  HeatmapRequestParams,
  HeatmapResponse,
} from '@/features/my-page/heatmap/heatmap.api.types'

import { HEATMAP_ENDPOINTS } from './endpoint'

export const heatmapApi = {
  getHeatmap: (params: HeatmapRequestParams) =>
    apiClient.get<HeatmapResponse>(HEATMAP_ENDPOINTS.heatmap, { params }),
} as const
