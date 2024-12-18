import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { queryKey } from '@/src/lib/tanstack/query-key'
import { routes } from '@/src/routes'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

interface IComment {
  userId?: string
  content: string
  postId: number
  commentId: number | null
}

export default function usePostComment() {
  const queryClient = getQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async (params: IComment) => {
      return supabase
        .from('comment')
        .insert({
          user_id: params.userId,
          content: params.content,
          post_id: params.postId,
          comment_id: params.commentId || null,
        })
        .select()
        .single()
    },
    onSuccess: () => {
      router.replace(routes.modal.success)
    },
    onSettled: (_, __, variables) => {
      const { postId, commentId } = variables
      queryClient.invalidateQueries({
        queryKey: queryKey.comment.byPost(postId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKey.comment.byComment(postId, commentId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKey.comment.count.byPost(postId),
      })
      queryClient.invalidateQueries({
        queryKey: queryKey.comment.count.byComment(postId, commentId),
      })
    },
  })
}
