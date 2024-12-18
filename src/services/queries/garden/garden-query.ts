import { queryKey } from '@/src/lib/tanstack/query-key'
import { Tables } from '@/src/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'

export const gardenQuery = {
  getGarden: (supabase: SupabaseClient, userId: string) =>
    queryOptions<Tables<'garden'>[]>({
      queryKey: [queryKey.garden(userId)],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('garden')
          .select()
          .eq('user_id', userId)

        if (error) {
          throw error
        }

        return data
      },
    }),
}
