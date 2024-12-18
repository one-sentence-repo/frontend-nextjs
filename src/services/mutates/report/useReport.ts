import { supabase } from '@/src/lib/supabase/client'
import { useMutation } from '@tanstack/react-query'

interface IReport {
  reporterId?: string
  targetPostId?: number
  targetCommentId?: number
  reason: string
}

export default function useReport() {
  return useMutation({
    mutationFn: async (params: IReport) => {
      return supabase
        .from('report')
        .insert({
          reporter_id: params.reporterId,
          target_post_id: params.targetPostId || null,
          target_comment_id: params.targetCommentId || null,
          reason: params.reason,
        })
        .select()
    },
  })
}
