import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'

export const emotionQuery = {
  getEmotionAverage: (supabase: SupabaseClient, userId: string) =>
    queryOptions({
      queryKey: ['user_emotion_average', userId],
      queryFn: async () => {
        const { data } = await supabase
          .from('post')
          .select('emotion_level')
          .neq('emotion_level', null)
          .eq('user_id', userId)
        let result

        if (data && data?.length > 0) {
          const splitArray = data.map((item) =>
            Number(item.emotion_level?.split('%')[0]),
          )
          const sum = splitArray.reduce((prev, curr) => prev + curr, 0)
          result = Math.floor(sum / splitArray.length)
        } else {
          result = 0
        }

        return result
      },
    }),

  getMonthEmotionAverage: (
    supabase: SupabaseClient,
    userId: string,
    date: string,
  ) =>
    queryOptions({
      queryKey: ['user_emotion', date, userId],
      queryFn: async () => {
        const { data } = await supabase
          .from('post')
          .select('emotion_level')
          .rangeGt('created_at', date)
          .eq('user_id', userId)
      },
    }),
}
