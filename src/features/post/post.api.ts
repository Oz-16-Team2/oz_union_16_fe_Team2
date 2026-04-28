import { apiClient } from '@/apis/apiClient'

import type {
  CreateCommentApiRequest,
  CreateCommentApiResponse,
  GetCommentsApiResponse,
} from './post.api.types'
import {
  mapCommentApiToComment,
  mapCommentsApiToComments,
} from './post.mappers'

export const postApi = {
  async getComments(postId: number) {
    const { data } = await apiClient.get<GetCommentsApiResponse>(
      `/posts/${postId}/comments`
    )

    return mapCommentsApiToComments(data)
  },

  async createComment(postId: number, body: CreateCommentApiRequest) {
    const { data } = await apiClient.post<CreateCommentApiResponse>(
      `/posts/${postId}/comments`,
      body
    )

    return mapCommentApiToComment(data)
  },
}
