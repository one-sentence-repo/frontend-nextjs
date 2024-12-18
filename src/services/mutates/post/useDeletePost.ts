import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { queryKey } from '@/src/lib/tanstack/query-key'
import { useMutation } from '@tanstack/react-query'

export default function useDeletePost() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (postId: number) => {
      return supabase.from('post').delete().eq('id', postId).select()
    },
    onSettled: (_, __, postId) => {
      queryClient.invalidateQueries({ queryKey: queryKey.post.public })
      queryClient.invalidateQueries({ queryKey: queryKey.post.detail(postId) })
    },
  })
}
