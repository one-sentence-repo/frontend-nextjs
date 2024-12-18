import { PropsWithChildren } from 'react'
import { XStack } from './Stack'
import Button from './Button'

const Follow = ({ children }: PropsWithChildren) => {
  return <XStack>{children}</XStack>
}

interface FollowerProps {
  followerCount: number | null
  onClick: () => void
}

const Follower = ({ followerCount, onClick }: FollowerProps) => {
  return (
    <Button
      variant="none"
      size="none"
      className="text-xs font-normal text-zinc-400 hover:opacity-65 dark:text-zinc-500"
      onClick={onClick}
    >
      팔로워 {followerCount}명
    </Button>
  )
}

interface FollowingProps {
  followingCount: number | null
  onClick: () => void
}

const Following = ({ followingCount, onClick }: FollowingProps) => {
  return (
    <Button
      variant="none"
      size="none"
      className="text-xs font-normal text-zinc-400 hover:opacity-65 dark:text-zinc-500"
      onClick={onClick}
    >
      팔로잉 {followingCount}명
    </Button>
  )
}

Follow.Follower = Follower
Follow.Following = Following

export default Follow
