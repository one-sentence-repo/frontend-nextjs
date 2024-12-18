import { queryKey } from '@/src/lib/tanstack/query-key'
import { IUserInfoWithMBTI } from '@/src/types/auth'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'

export interface IUserSession {
  about_me: string
  avatar_url: string | null
  email: string
  email_verified: boolean
  user_name: string
  phone_verified: boolean
  sub: string
  userId: string
  provider: string
}

export const meQuery = {
  getUserSession: (supabase: SupabaseClient) =>
    queryOptions<IUserSession | null>({
      queryKey: queryKey.auth.session,
      queryFn: async () => {
        const { data, error } = await supabase.auth.getUser()

        if (error) {
          return null
        }

        return {
          ...data.user?.user_metadata,
          userId: data.user?.id,
          provider: data.user.app_metadata.provider,
        } as IUserSession
      },
      staleTime: 300000,
    }),

  getUserInfo: (supabase: SupabaseClient, userId?: string) =>
    queryOptions<IUserInfoWithMBTI>({
      queryKey: queryKey.auth.info,
      queryFn: async () => {
        const { data } = await supabase
          .from('user_info')
          .select()
          .eq('id', userId)
          .single()

        return data
      },
      enabled: !!userId,
    }),
}
