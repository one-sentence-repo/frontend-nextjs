import { queryKey } from '@/src/lib/tanstack/query-key'
import { ICommentWithUserInfo } from '@/src/types/comment'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'

export const commentQuery = {
  getComment: (supabase: SupabaseClient, postId: number) =>
    queryOptions<ICommentWithUserInfo[]>({
      queryKey: queryKey.comment.byPost(postId),
      queryFn: async () => {
        const { data, error } = await supabase
          .from('comment')
          .select(
            `
            *,
            user_info(
              email,
              user_name,
              avatar_url
            )`,
          )
          .eq('post_id', postId)
          .is('comment_id', null)
          .order('created_at', { ascending: true })

        if (error) {
          throw error
        }

        return data
      },
      enabled: !!postId,
    }),

  getCommentToComment: (
    supabase: SupabaseClient,
    postId: number,
    commentId: number,
  ) =>
    queryOptions<ICommentWithUserInfo[]>({
      queryKey: queryKey.comment.byComment(postId, commentId),
      queryFn: async () => {
        const { data, error } = await supabase
          .from('comment')
          .select(
            `
            *,
            user_info(
              email,
              user_name,
              avatar_url
            )
            `,
          )
          .eq('post_id', postId)
          .eq('comment_id', commentId)
          .order('created_at', { ascending: false })

        if (error) {
          throw error
        }

        return data
      },
      enabled: !!commentId,
    }),
}
