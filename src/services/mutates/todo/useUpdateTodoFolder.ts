import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'
import { queryKey } from '@/src/lib/tanstack/query-key'
import { useRouter } from 'next/navigation'
import { routes } from '@/src/routes'
import { useToast } from '@/src/store/useToast'

interface ITodoFolder {
  name: string
  color: string
  index: number
  id: number
}

export default function useUpdateTodoFolder() {
  const queryClient = getQueryClient()
  const router = useRouter()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (params: ITodoFolder) => {
      return supabase
        .from('todo_folder')
        .update({
          name: params.name,
          color: params.color,
          index: params.index,
        })
        .eq('id', params.id)
        .select()
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: queryKey.todo.main })
      router.push(routes.todo.view.folder(variables.id, variables.color))
      openToast({ text: '할일 폴더가 수정되었습니다.', type: 'info' })
    },
  })
}
