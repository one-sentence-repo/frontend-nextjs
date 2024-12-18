import { queryKey } from '@/src/lib/tanstack/query-key'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'

export const countFollowQuery = {
  /** 유저를 팔로우하는 유저의 Id들 */
  countFollower: (supabase: SupabaseClient, userId?: string) =>
    queryOptions({
      queryKey: queryKey.follow.count.follower(userId),
      queryFn: async () => {
        const { count, error } = await supabase
          .from('follow')
          .select('followed_user_id', { count: 'exact', head: true })
          .eq('followed_user_id', userId)

        if (error) {
          console.error('팔로워 총원 조회 실패:', error)
        }

        return count
      },
    }),

  /** 유저가 팔로우하는 유저의 Id들 */
  countFollowing: (supabase: SupabaseClient, userId?: string) =>
    queryOptions({
      queryKey: queryKey.follow.count.following(userId),
      queryFn: async () => {
        const { count, error } = await supabase
          .from('follow')
          .select('follower_user_id', { count: 'exact', head: true })
          .eq('follower_user_id', userId)

        if (error) {
          console.error('팔로잉 총원 조회 실패:', error)
        }

        return count
      },
    }),
}
