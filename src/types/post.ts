import { Tables } from './supabase'

export interface IFavoriteWord {
  word: string
  count: number
}

export interface IPostWithUserInfo
  extends Omit<Tables<'post'>, 'post_type' | 'access_type' | 'emotion_level'> {
  user_info: Pick<
    Tables<'user_info'>,
    'user_name' | 'email' | 'avatar_url' | 'about_me'
  >
  post_type: 'article' | 'journal'
  access_type: 'public' | 'private'
  emotion_level: '0%' | '25%' | '50%' | '75%' | '100%' | null
  like: { count: number }[]
}

export interface ILikedPostWithUserInfo {
  id: number
  post: IPostWithUserInfo[]
}

export interface IPostInfiniteQuery {
  pages: Tables<'post'>[]
  pageParams: number
}
