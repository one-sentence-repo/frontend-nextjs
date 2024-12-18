import { Tables } from './supabase'

export interface TFollowings extends Tables<'follow'> {
  user_info: Tables<'user_info'>
}
