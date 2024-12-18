import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { queryKey } from '@/src/lib/tanstack/query-key'
import { useMutation } from '@tanstack/react-query'

interface IUpdatepost {
  user_id: string
  id: number
  title: string | null
  content: string
  emotion_level: string | null
  tags: string[]
  access_type: 'private' | 'public'
  post_type: 'article' | 'journal'
}

export default function useUpdatepost() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: IUpdatepost) => {
      return supabase
        .from('post')
        .update({ ...params })
        .eq('id', params.id)
    },
    onSuccess: (_, variables) => {
      const { id, user_id: meId } = variables
      queryClient.invalidateQueries({ queryKey: queryKey.post.public })
      queryClient.invalidateQueries({ queryKey: queryKey.post.detail(id) })
      queryClient.invalidateQueries({
        queryKey: queryKey.post.byPostType('article', meId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKey.post.byPostType('journal', meId),
      })
    },
  })
}
