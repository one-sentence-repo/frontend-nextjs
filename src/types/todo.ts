export type TTodoColor =
  | 'black'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'orange'
  | 'red'
  | 'purple'

export interface Todo {
  id: number
  name: string
  createdAt: number
  updatedAt: number
  isSuccess: boolean
  folderId: number
  memo?: string
}

export interface TTodo {
  pending: Todo[]
  success: Todo[]
}

export interface TodoFolder {
  id: number
  name: string
  createdAt: number
  updatedAt: number
  dotColor: TTodoColor
  index: number
}
