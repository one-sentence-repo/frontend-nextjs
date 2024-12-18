import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { queryKey } from '@/src/lib/tanstack/query-key'
import { routes } from '@/src/routes'
import { ISignIn } from '@/src/types/auth'
import { useMutation } from '@tanstack/react-query'

export default function useSignIn() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (authData: ISignIn) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: authData.email,
        password: authData.password,
      })

      if (error) {
        throw error
      }

      return data
    },
    onSuccess: () => {
      window.location.href = routes.home
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.auth.info })
      queryClient.invalidateQueries({ queryKey: queryKey.auth.session })
    },
  })
}
