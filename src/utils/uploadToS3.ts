import axios from 'axios'

import { postApi } from '@/apis/post'

/**
 * 단일 파일을 S3에 업로드하고 image_url을 반환합니다.
 * 1. presigned URL 발급 (POST /posts/presigned-url/)
 * 2. presigned URL로 파일 PUT (S3 직접 업로드, 인증 헤더 불필요)
 */
async function uploadSingleFileToS3(file: File): Promise<string> {
  const { data } = await postApi.getPresignedUrl({
    filename: file.name,
    content_type: file.type,
  })
  await axios.put(data.detail.presigned_url, file, {
    headers: { 'Content-Type': file.type },
  })

  return data.detail.image_url
}

/**
 * 여러 파일을 병렬로 S3에 업로드하고 image_url 목록을 반환합니다.
 */
export async function uploadFilesToS3(files: File[]): Promise<string[]> {
  return Promise.all(files.map(uploadSingleFileToS3))
}
