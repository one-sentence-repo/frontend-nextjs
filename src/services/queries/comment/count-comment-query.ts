import { queryKey } from '@/src/lib/tanstack/query-key'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'

export const countCommentQuery = {
  countCommentFromPost: (supabase: SupabaseClient, postId?: number) =>
    queryOptions({
      queryKey: queryKey.comment.count.byPost(postId),
      queryFn: async () => {
        const { count } = await supabase
          .from('comment')
          .select('*', { count: 'exact', head: true })
          .eq('post_id', postId)

        return count
      },
    }),
  countCommentFromComment: (
    supabase: SupabaseClient,
    postId?: number,
    commentId?: number,
  ) =>
    queryOptions({
      queryKey: queryKey.comment.count.byComment(postId, commentId),
      queryFn: async () => {
        const { count } = await supabase
          .from('comment')
          .select('*', { count: 'exact', head: true })
          .eq('post_id', postId)
          .eq('comment_id', commentId)

        return count
      },
      enabled: !!commentId,
    }),
}
