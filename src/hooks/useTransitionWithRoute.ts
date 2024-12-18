import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export default function useTransitionWithRoute(): [
  boolean,
  (route: string) => void,
] {
  const [isLoading, startTransition] = useTransition()
  const router = useRouter()

  const handleStartTransition = (route: string): void => {
    startTransition(() => router.push(route))
  }

  return [isLoading, handleStartTransition]
}
