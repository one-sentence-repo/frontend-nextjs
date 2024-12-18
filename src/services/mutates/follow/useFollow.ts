import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { queryKey } from '@/src/lib/tanstack/query-key'
import { useMutation } from '@tanstack/react-query'

interface Params {
  followed_user_id: string
  follower_user_id: string
}

export default function useFollow() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: Params) => {
      const { data, error } = await supabase
        .from('follow')
        .insert({ ...params })
        .select()

      if (error) {
        console.error('팔로우 실패:', error)
      }

      return data
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKey.follow.follower(variables.followed_user_id),
      })
      queryClient.invalidateQueries({
        queryKey: queryKey.follow.count.follower(variables.followed_user_id),
      })
      queryClient.invalidateQueries({
        queryKey: queryKey.follow.following(variables.follower_user_id),
      })
      queryClient.invalidateQueries({
        queryKey: queryKey.follow.count.following(variables.follower_user_id),
      })
    },
  })
}
