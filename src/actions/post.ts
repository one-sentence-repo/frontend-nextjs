'use server'

import { fetcher } from '@/src/utils/fetcher'
import { PostDetail } from '@/src/types/post'

export const getPostDetail = async (postId: number): Promise<PostDetail> => {
  const response = await fetcher(`/post/${postId}`)
  return await response.json()
}

export const getPosts = async (): Promise<PostDetail[]> => {
  const response = await fetcher('/posts', { cache: 'force-cache' }, false)
  return await response.json()
}
