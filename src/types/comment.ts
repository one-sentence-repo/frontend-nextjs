import { Tables } from './supabase'

export interface ICommentWithUserInfo extends Tables<'comment'> {
  user_info: Pick<Tables<'user_info'>, 'user_name' | 'email' | 'avatar_url'>
}
