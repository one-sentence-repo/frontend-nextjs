'use client'

import { RefObject } from 'react'
import { usePathname } from 'next/navigation'

import {
  AUTH_NAVIGATE_MENUS,
  BOTTOM_NAVIGATE_MENUS,
  TOP_NAVIGATE_MENUS,
} from '../../@sidebar/_constants/Navigate'
import useMe from '@/src/hooks/useMe'

import Button from '@/src/components/shared/Button'
import Icon from '@/src/components/shared/Icon'
import Text from '@/src/components/shared/Text'
import Line from '@/src/components/shared/Line'
import { List } from '@/src/components/shared/List'
import { YStack } from '@/src/components/shared/Stack'
import MenuButton from '../../@sidebar/_components/MenuButton'
import AuthButtonWithDropDown from '../../@sidebar/_components/AuthButtonWithDropDown'
import MobileWriteButtonWithLogo from './MobileWriteButtonWithLogo'

interface Props {
  targetRef: RefObject<HTMLDivElement>
  close: () => void
  onTransitionEnd: () => void
  isOpen: boolean
}

export default function MobileMenu({
  targetRef,
  close,
  onTransitionEnd,
  isOpen,
}: Props) {
  const pathname = usePathname()
  const { me, session } = useMe()

  return (
    <>
      <div
        ref={targetRef}
        onTransitionEnd={onTransitionEnd}
        data-status="closed"
        className="fixed left-0 top-0 z-50 h-dvh w-3/4 origin-left gap-2 rounded-r-lg bg-white p-2 shadow-md transition duration-300 ease-in-out data-[status=closed]:-translate-x-full dark:bg-var-darkgray"
      >
        <YStack className="h-full">
          <Button
            variant="icon"
            onClick={close}
            size="md"
            className="flex w-fit items-start justify-start sm:hidden"
          >
            <Icon view="0 -960 960 960" size={24}>
              <path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z" />
            </Icon>
          </Button>
          <Line className="my-2" />
          <MobileWriteButtonWithLogo
            closeMenu={close}
            isSelected={pathname === '/write'}
          />
          <List className="flex flex-1 flex-col gap-2">
            {TOP_NAVIGATE_MENUS.map((menu) => (
              <List.Row key={menu.id}>
                <MenuButton
                  viewText
                  isSelected={pathname === menu.path}
                  close={close}
                  icon={menu.icon}
                  name={menu.name}
                  path={menu.path}
                />
              </List.Row>
            ))}
          </List>
          <List className="flex flex-col gap-2">
            {BOTTOM_NAVIGATE_MENUS.map((menu) => (
              <List.Row key={menu.id}>
                <MenuButton
                  viewText
                  key={menu.id}
                  isSelected={pathname === menu.path}
                  icon={menu.icon}
                  name={menu.name}
                  close={close}
                  path={menu.path}
                />
              </List.Row>
            ))}
          </List>
          <Line className="my-2" />
          {session ? (
            <AuthButtonWithDropDown
              viewText
              me={me}
              session={session}
              closeMenu={close}
              pathname={pathname.split('/')[1]}
              userId={pathname.split('/')[2]}
            />
          ) : (
            <List>
              {AUTH_NAVIGATE_MENUS.map((menu) => (
                <List.Row key={menu.id}>
                  <MenuButton
                    viewText
                    key={menu.id}
                    isSelected={pathname === menu.path}
                    icon={menu.icon}
                    name={menu.name}
                    close={close}
                    path={menu.path}
                  />
                </List.Row>
              ))}
            </List>
          )}
          <YStack gap={4} className="my-4 items-center">
            <Text type="caption" size="sm">
              © 2024 One-Sentence. All rights reserved.
            </Text>
          </YStack>
        </YStack>
      </div>
      {isOpen && (
        <div
          className="fixed bottom-0 left-0 top-0 z-20 h-dvh w-full"
          onClick={close}
        />
      )}
    </>
  )
}
