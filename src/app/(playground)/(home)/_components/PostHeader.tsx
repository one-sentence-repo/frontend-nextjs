import ToolTip from '@/src/components/shared/Tooltip'
import AvatarButtonWithDropDown from './AvatarButtonWithDropDown'
import EmotionButtonWithDropDown from './EmotionButtonWithDropDown'
import NameWithDateSection from './NameWithDateSection'
import useToggle from '@/src/hooks/useToggle'
import { XStack, ZStack } from '@/src/components/shared/Stack'
import { Container } from '@/src/components/shared/Container'
import { TEmotion } from '@/src/app/(playground)/post/edit/page'

interface Props {
  avatarUrl: string | null
  userName: string | null
  email: string | null
  emotionLevel: TEmotion
  createdAt: string
  userId: string
  createdAtLiked?: string
  postType: 'journal' | 'article'
  followerCount: number | null
  followingCount: number | null
  isMe: boolean
  isFollowing: boolean
  isModal?: boolean
  onClick?: () => void
}

export default function PostHeader({
  avatarUrl,
  userName,
  email,
  createdAtLiked,
  emotionLevel,
  userId,
  createdAt,
  followerCount,
  postType,
  followingCount,
  isMe,
  isFollowing,
}: Props) {
  const { isOpen: isHover, open: hover, close: leave } = useToggle()

  return (
    <XStack className="w-full items-end">
      <AvatarButtonWithDropDown
        avatarUrl={avatarUrl}
        followerCount={followerCount}
        followingCount={followingCount}
        isMe={isMe}
        isFollowing={isFollowing}
        userId={userId}
        userName={userName}
        position="bottomRight"
      />
      <XStack className="flex-1 items-end">
        <NameWithDateSection
          userName={userName}
          email={email}
          createdAt={createdAt}
          createdAtLiked={createdAtLiked}
          postType={postType}
        />
      </XStack>
      {emotionLevel && (
        <ZStack>
          <Container onMouseEnter={hover} onMouseLeave={leave}>
            <EmotionButtonWithDropDown emotionLevel={emotionLevel} />
            <ToolTip
              isHover={isHover}
              position="bottomRight"
              text="감정 농도"
            />
          </Container>
        </ZStack>
      )}
    </XStack>
  )
}
