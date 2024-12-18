import { DropDown } from '@/src/components/shared/DropDown'
import Icon from '@/src/components/shared/Icon'
import { routes } from '@/src/routes'
import { wait } from '@/src/utils/wait'
import { useRouter } from 'next/navigation'

interface Props {
  closeMenu?: () => void
}

export default function GuestContent({ closeMenu }: Props) {
  const router = useRouter()

  const pushSignUpPage = async () => {
    router.push(routes.modal.auth.signup)
    await wait(100)
    closeMenu && closeMenu()
  }

  const pushSignInPage = async () => {
    router.push(routes.modal.auth.signin)
    await wait(100)
    closeMenu && closeMenu()
  }

  return (
    <>
      <DropDown.Button
        variant="list"
        onClick={pushSignUpPage}
        className="flex w-full gap-2 pl-1"
      >
        <Icon view="0 -960 960 960" size={18}>
          <path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z" />
        </Icon>
        회원가입
      </DropDown.Button>
      <DropDown.Button
        variant="list"
        onClick={pushSignInPage}
        className="flex w-full gap-2 pl-1"
      >
        <Icon view="0 -960 960 960" size={18}>
          <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
        </Icon>
        로그인
      </DropDown.Button>
    </>
  )
}
