import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'
import { queryKey } from '@/src/lib/tanstack/query-key'
import { useToast } from '@/src/store/useToast'

export default function useDeleteTodoFolder() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (folderId: number) => {
      return supabase.from('todo_folder').delete().eq('id', folderId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.todo.main })
      openToast({ text: '할일 폴더가 삭제되었습니다.', type: 'warning' })
    },
  })
}
