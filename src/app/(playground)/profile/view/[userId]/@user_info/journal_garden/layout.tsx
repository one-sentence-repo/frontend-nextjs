import { ReactNode } from 'react'

interface Props {
  garden: ReactNode
  that_day: ReactNode
}

export default function Layout({ garden, that_day }: Props) {
  return (
    <>
      {garden}
      {that_day}
    </>
  )
}
