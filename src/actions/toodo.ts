'use server'

import { baseUrl } from '@/src/routes'
import { TodoDetail } from '@/src/types/todo'
import { fetcher } from '@/src/utils/fetcher'

export const getTodo = async (
  userId: number,
  todoId: number,
): Promise<TodoDetail> => {
  const response = await fetch(`${baseUrl}/todo/${userId}/${todoId}`)
  return response.json()
}

export const getTodos = async (
  userId: number,
  folderId: number,
): Promise<TodoDetail[]> => {
  const response = await fetcher(`${baseUrl}/todo/${userId}/${folderId}`)
  return response.json()
}
