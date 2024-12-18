import { queryKey } from '@/src/lib/tanstack/query-key'
import { Tables } from '@/src/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'

export const userQuery = {
  getUserInfo: (supabase: SupabaseClient, userId: string) =>
    queryOptions<Tables<'user_info'>>({
      queryKey: queryKey.user.info(userId),
      queryFn: async () => {
        const { data } = await supabase
          .from('user_info')
          .select()
          .eq('id', userId)
          .single()

        return data
      },
    }),
}
