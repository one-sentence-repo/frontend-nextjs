import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'
import { queryKey } from '@/src/lib/tanstack/query-key'
import { useToast } from '@/src/store/useToast'

interface IDeleteTodo {
  todoId: number
  folderId: number
}

export default function useDeleteTodo() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (params: IDeleteTodo) => {
      const { data } = await supabase
        .from('todo')
        .delete()
        .eq('id', params.todoId)
      return data
    },
    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey: queryKey.todo.folder(variables.folderId),
      })
      openToast({ text: '할일이 삭제되었습니다.', type: 'info' })
    },
  })
}
