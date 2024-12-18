import { queryKey } from '@/src/lib/tanstack/query-key'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'

export const countPostQuery = {
  countLikedPost: (supabase: SupabaseClient, userId: string) =>
    queryOptions({
      queryKey: queryKey.post.count.liked(userId),
      queryFn: async () => {
        const { count } = await supabase
          .from('like')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)
        return count
      },
      enabled: !!userId,
    }),

  countAllMyPost: (supabase: SupabaseClient, userId: string) =>
    queryOptions({
      queryKey: queryKey.post.count.total(userId),
      queryFn: async () => {
        const { count } = await supabase
          .from('post')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)

        return count
      },
      enabled: !!userId,
    }),

  countAllPost: (
    supabase: SupabaseClient,
    userId: string,
    postType: 'journal' | 'article',
  ) =>
    queryOptions({
      queryKey: queryKey.post.count.byPostType(userId, postType),
      queryFn: async () => {
        const { count } = await supabase
          .from('post')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)
          .eq('post_type', postType)

        return { count, postType }
      },
      enabled: !!userId,
    }),
}
