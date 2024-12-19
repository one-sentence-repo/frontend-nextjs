export interface PostDetail {
  id: number
  title: string
  content: string
  postType: 'article' | 'journal'
  accessType: 'public' | 'private'
  emotionLevel: '0%' | '25%' | '50%' | '75%' | '100%' | null
  commentCount: number
  likeCount: number
}
