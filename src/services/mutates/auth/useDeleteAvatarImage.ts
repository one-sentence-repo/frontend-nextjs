import { supabase } from '@/src/lib/supabase/client'
import { useMutation } from '@tanstack/react-query'

export default function useDeleteAvatarImage() {
  return useMutation({
    mutationFn: async (imageUrl: string) => {
      const splitedPath = imageUrl.split('/')
      const email = splitedPath[splitedPath.length - 2]
      const fileName = splitedPath[splitedPath.length - 1]

      return supabase.storage
        .from('profile_image')
        .remove([`${email}/${fileName}`])
    },
  })
}
