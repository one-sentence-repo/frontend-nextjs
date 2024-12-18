import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'
import { queryKey } from '@/src/lib/tanstack/query-key'
import { useToast } from '@/src/store/useToast'

interface ITodo {
  name: string
  folderId: number
  userId: string
  index: number
}

export default function useAddTodo() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()
  return useMutation({
    mutationFn: async (params: ITodo) => {
      return supabase
        .from('todo')
        .insert({
          name: params.name,
          folder_id: params.folderId,
          user_id: params.userId,
          index: params.index,
        })
        .select()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKey.todo.folder(variables.folderId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKey.todo.main,
      })
      openToast({ text: '할일이 추가되었습니다.', type: 'info' })
    },
  })
}
