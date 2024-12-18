'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import useUploadAvatarImage from '@/src/services/mutates/auth/useUploadAvatarImage'
import useUpdateUserInfo from '@/src/services/mutates/auth/useUpdateUserInfo'
import useDeleteAvatarImage from '@/src/services/mutates/auth/useDeleteAvatarImage'
import { useInput } from '@/src/hooks/useInput'
import useMe from '@/src/hooks/useMe'
import { TMBTI } from '../_constants/mbti'

import Button from '@/src/components/shared/Button'
import { YStack } from '@/src/components/shared/Stack'
import ProfileImageSection from '../_components/ProfileImageSection'
import UserNameSection from '../_components/UserNameSection'
import AboutMeSection from '../_components/AboutMeSection'
import MBTISection from '../_components/MBTISection'
import EmailSection from '../_components/EmailSection'

export default function EditProfileContainer() {
  const { me, session } = useMe()
  const [userName, onChangeUserName, setUserName] = useInput<string | null>('')
  const [aboutMe, onChangeAboutMe, setAboutMe] = useInput<string | null>('')
  const [avatarUrl, , setAvatarUrl] = useInput<string | null>('')
  const [mbti, setMbti] = useState<TMBTI>(null)
  const [image, setImage] = useState<File | null>(null)
  const [prevAvatarUrl, , setPrevAvatarUrl] = useInput<string | null>('')
  const {
    mutate: updateProfile,
    isPending: isPendingUpdateUserInfo,
    isSuccess: isSuccessUpdateUserInfo,
  } = useUpdateUserInfo()
  const { mutateAsync: uploadImage, isPending: isPendingImageUpload } =
    useUploadAvatarImage()
  const { mutate: deletePrevImage } = useDeleteAvatarImage()

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setAvatarUrl(URL.createObjectURL(file))
    }
  }

  const handleProfileUpdateWithImage = () => {
    if (prevAvatarUrl) {
      deletePrevImage(prevAvatarUrl)
    }
    uploadImage(
      { email: me?.email, image },
      {
        onSuccess: (data) => {
          updateProfile({
            userId: me?.id,
            aboutMe,
            avatarUrl: data,
            userName,
            mbti,
          })
        },
      },
    )
  }

  const handleProfileUpdateWithoutImage = () => {
    updateProfile({
      userId: me?.id,
      aboutMe,
      userName,
      mbti,
    })
  }

  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault()
    if (image) {
      handleProfileUpdateWithImage()
    } else {
      handleProfileUpdateWithoutImage()
    }
  }

  useEffect(() => {
    setUserName(me ? me.user_name : null)
    setAboutMe(me ? me.about_me : null)
    setAvatarUrl(me ? me.avatar_url : null)
    setPrevAvatarUrl(me ? me.avatar_url : null)
    setMbti(me ? me.mbti : null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me?.avatar_url, me?.user_name, me?.about_me])

  return (
    <form
      onSubmit={handleProfileUpdate}
      className="animate-fade-in rounded-md bg-white p-2 shadow-sm sm:p-8 dark:bg-var-darkgray"
    >
      <YStack gap={8}>
        <ProfileImageSection
          onChange={handleChangeImage}
          imagePreview={avatarUrl}
        />
        <EmailSection email={me?.email} provider={session?.provider} />
        <UserNameSection value={userName ?? ''} onChange={onChangeUserName} />
        <AboutMeSection value={aboutMe ?? ''} onChange={onChangeAboutMe} />
        <MBTISection mbti={mbti} setMbti={setMbti} />
        <Button
          type="submit"
          isLoading={
            isPendingImageUpload ||
            isPendingUpdateUserInfo ||
            isSuccessUpdateUserInfo
          }
          disabled={
            (userName === me?.user_name &&
              aboutMe === me?.about_me &&
              avatarUrl === me?.avatar_url &&
              mbti === me?.mbti) ||
            userName?.length! > 10 ||
            aboutMe?.length! > 150
          }
        >
          수정하기
        </Button>
      </YStack>
    </form>
  )
}
