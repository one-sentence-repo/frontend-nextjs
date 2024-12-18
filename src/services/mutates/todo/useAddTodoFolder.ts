import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'
import { queryKey } from '@/src/lib/tanstack/query-key'
import { useToast } from '@/src/store/useToast'

interface ITodoFolder {
  name: string
  color: string
  index: number
  userId: string
}

export default function useAddTodoFolder() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (params: ITodoFolder) => {
      return supabase
        .from('todo_folder')
        .insert({
          name: params.name,
          color: params.color,
          index: params.index,
          user_id: params.userId,
        })
        .select()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.todo.main })
      openToast({ text: '할일 폴더가 추가되었습니다.', type: 'info' })
    },
  })
}
