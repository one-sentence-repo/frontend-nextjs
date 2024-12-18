import { queryKey } from '@/src/lib/tanstack/query-key'
import { routes } from '@/src/routes'
import { Tables } from '@/src/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'

export const todoQuery = {
  getTodoInProgress: (supabase: SupabaseClient, userId: string) =>
    queryOptions<Tables<'todo'>[]>({
      queryKey: queryKey.todo.inProgress,
      queryFn: async () => {
        const { data } = await supabase
          .from('todo')
          .select()
          .eq('user_id', userId)
          .is('is_complete', false)

        return data as Tables<'todo'>[]
      },
    }),

  getTodoInCompleted: (supabase: SupabaseClient, userId: string) =>
    queryOptions<Tables<'todo'>[]>({
      queryKey: queryKey.todo.completed,
      queryFn: async () => {
        const { data } = await supabase
          .from('todo')
          .select()
          .eq('user_id', userId)
          .is('is_complete', true)

        return data as Tables<'todo'>[]
      },
    }),

  getTodoFromFolder: (
    supabase: SupabaseClient,
    userId: string,
    folderId: number,
  ) =>
    queryOptions<Tables<'todo'>[]>({
      queryKey: queryKey.todo.folder(folderId),
      queryFn: async () => {
        let myTodo
        const { data } = await supabase
          .from('todo')
          .select()
          .eq('user_id', userId)

        if (data) {
          myTodo = data.filter(
            (todoFolder: Tables<'todo'>) => todoFolder.folder_id === folderId,
          )
        }
        return myTodo || []
      },
    }),

  getTodoIndex: (supabase: SupabaseClient, userId: string, folderId: number) =>
    queryOptions({
      queryKey: queryKey.todo.index(folderId),
      queryFn: async () => {
        const { data } = await supabase
          .from('todo')
          .select()
          .eq('user_id', userId)
      },
    }),
}
