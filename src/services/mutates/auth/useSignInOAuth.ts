import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { queryKey } from '@/src/lib/tanstack/query-key'
import { isDevelop } from '@/src/utils/isDevelop'
import { useMutation } from '@tanstack/react-query'

const getRedirectUri = () => {
  return isDevelop
    ? 'http://localhost:3000'
    : 'https://one-sentence-gray.vercel.app'
}

export const useSignInOAuth = () => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${getRedirectUri()}/oauth/kakao/callback`,
        },
      })
      if (error) {
        throw error
      }
      return data
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.auth.info })
      queryClient.invalidateQueries({ queryKey: queryKey.auth.session })
    },
  })
}
