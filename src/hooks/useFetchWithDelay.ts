import { wait } from '@/src/utils/wait'
import { useEffect, useState } from 'react'

export default function useFetchWithDelay(
  pending: boolean,
  time: number = 500,
) {
  const [isPending, setPending] = useState(false)

  const handleFollowPending = async () => {
    if (pending) {
      setPending(true)
    }
    await wait(time)
    setPending(pending)
  }

  useEffect(() => {
    handleFollowPending()
  }, [pending])

  return isPending
}
