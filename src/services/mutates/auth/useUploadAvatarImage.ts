import { supabase } from '@/src/lib/supabase/client'
import { useMutation } from '@tanstack/react-query'

interface IFile {
  email?: string | null
  image: File | null
}

export default function useUploadAvatarImage() {
  return useMutation({
    mutationFn: async (params: IFile) => {
      const { data, error } = await supabase.storage
        .from('profile_image')
        .upload(`${params.email}/${new Date().getTime()}`, params.image!)

      if (error) {
        throw error
      }
      // 미작동 로직,
      return `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BASE_URL!}/${data?.fullPath}`
    },
  })
}
