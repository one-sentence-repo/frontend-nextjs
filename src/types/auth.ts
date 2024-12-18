import { TMBTI } from '@/src/app/(playground)/profile/edit/_constants/mbti'
import { Tables } from './supabase'

export interface ISignIn {
  email: string
  password: string
}

export interface ISignUp {
  email: string
  password: string
  userName: string
}

export interface IUpdateUserInfo {
  userId?: string | null
  aboutMe?: string | null
  userName?: string | null
  avatarUrl?: string | null
  mbti: TMBTI
}

export interface IUserInfoWithMBTI extends Tables<'user_info'> {
  mbti: TMBTI
}
