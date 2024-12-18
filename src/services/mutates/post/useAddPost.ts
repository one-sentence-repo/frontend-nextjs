import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { queryKey } from '@/src/lib/tanstack/query-key'
import { useMutation } from '@tanstack/react-query'

interface IAddpost {
  user_id: string
  title: string | null
  content: string
  emotion_level: string | null
  tags: string[]
  access_type: 'private' | 'public'
  post_type: 'article' | 'journal'
}

export default function useAddPost() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: IAddpost) => {
      return supabase
        .from('post')
        .insert({ ...params })
        .select()
    },
    onSuccess: (_, variables) => {
      const { user_id: userId } = variables
      queryClient.invalidateQueries({ queryKey: queryKey.post.public })
      queryClient.invalidateQueries({ queryKey: queryKey.garden(userId) })
      queryClient.invalidateQueries({
        queryKey: queryKey.post.count.total(userId),
      })
    },
  })
}
