export type TTodoColor =
  | 'black'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'orange'
  | 'red'
  | 'purple'

export interface TodoDetail {
  id: number
  createdAt: number
  userId: number
  folderId: number
  content: string
  isCompleted: boolean
  index: number
  memo: string | null
}

export interface TodoFolder {
  id: number
  name: string
  createdAt: number
  updatedAt: number
  dotColor: TTodoColor
  index: number
}
