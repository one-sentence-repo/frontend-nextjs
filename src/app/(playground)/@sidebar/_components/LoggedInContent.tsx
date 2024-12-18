import { DropDown } from '@/src/components/shared/DropDown'
import Icon from '@/src/components/shared/Icon'
import Line from '@/src/components/shared/Line'
import { routes } from '@/src/routes'
import useSignOut from '@/src/services/mutates/auth/useSignOut'
import { IUserInfoWithMBTI } from '@/src/types/auth'
import { wait } from '@/src/utils/wait'
import { useRouter } from 'next/navigation'

interface Props {
  me?: IUserInfoWithMBTI
  closeMenu?: () => void
}

export default function LoggedInContent({ me, closeMenu }: Props) {
  const router = useRouter()
  const { mutate: signOut } = useSignOut()

  const pushProfilePage = async () => {
    router.push(routes.profile.view(me?.id!))
    await wait(100)
    closeMenu && closeMenu()
  }

  const pushEditProfilePage = async () => {
    router.push(routes.profile.edit)
    await wait(100)
    closeMenu && closeMenu()
  }
  return (
    <>
      <div className="px-1">
        <DropDown.Text>{me?.user_name}</DropDown.Text>
        <DropDown.Text type="caption" size="sm">
          {me?.email}
        </DropDown.Text>
      </div>
      <Line className="mb-2 mt-4" />
      <DropDown.Button
        variant="list"
        onClick={pushEditProfilePage}
        className="flex w-full gap-2 px-1"
      >
        <Icon view="0 -960 960 960" size={18}>
          <path d="M400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-8 18-13.5 37.5T404-360h-4q-71 0-127.5 18T180-306q-9 5-14.5 14t-5.5 20v32h252q6 21 16 41.5t22 38.5H80Zm560 40-12-60q-12-5-22.5-10.5T584-204l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T628-460l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T732-180l-12 60h-80Zm40-120q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-560q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Zm12 400Z" />
        </Icon>
        프로필 수정
      </DropDown.Button>
      <DropDown.Button
        variant="list"
        onClick={pushProfilePage}
        className="flex w-full gap-2 px-1"
      >
        <Icon view="0 -960 960 960" size={18}>
          <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
        </Icon>
        프로필 페이지
      </DropDown.Button>
      <Line className="my-2" />
      <DropDown.Button
        variant="list"
        onClick={() => signOut()}
        className="flex gap-2 px-1"
      >
        <Icon view="0 -960 960 960" size={18}>
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
        </Icon>
        로그아웃
      </DropDown.Button>
    </>
  )
}
