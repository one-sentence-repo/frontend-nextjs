import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { Tables } from '@/src/types/supabase'
import { useMutation } from '@tanstack/react-query'
import { queryKey } from '@/src/lib/tanstack/query-key'

export default function useUpdateTodo() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: Tables<'todo'>) => {
      return supabase
        .from('todo')
        .update({
          name: params.name,
          folder_id: params.folder_id,
          user_id: params.user_id,
          memo: params.memo,
          is_complete: params.is_complete,
          updated_at: params.updated_at,
          index: params.index,
        })
        .eq('id', params.id)
        .select()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKey.todo.folder(variables.folder_id),
      })
      queryClient.invalidateQueries({ queryKey: queryKey.todo.inProgress })
    },
  })
}
