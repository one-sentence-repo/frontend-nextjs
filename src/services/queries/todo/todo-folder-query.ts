import { Tables } from '@/src/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'

export const todoFolderQuery = {
  getTodoFolder: (supabase: SupabaseClient, userId: string) =>
    queryOptions<Tables<'todo_folder'>[]>({
      queryKey: ['todo_folder'],
      queryFn: async () => {
        const { data } = await supabase
          .from('todo_folder')
          .select()
          .eq('user_id', userId)

        return data as Tables<'todo_folder'>[]
      },
    }),
}
