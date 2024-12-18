import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { routes } from '@/src/routes'
import { useMutation } from '@tanstack/react-query'

export default function useSignOut() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async () => {
      await supabase.auth.signOut()
      queryClient.removeQueries()
      alert('로그아웃 하였습니다.')
      window.location.href = routes.home
    },
  })
}
