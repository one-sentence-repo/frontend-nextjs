'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

import { routes } from '@/src/routes'
import useMe from '@/src/hooks/useMe'
import {
  BOTTOM_NAVIGATE_MENUS,
  TOP_NAVIGATE_MENUS,
} from './_constants/Navigate'

import ToolTip from '@/src/components/shared/Tooltip'
import { Container } from '@/src/components/shared/Container'
import { YStack, ZStack } from '@/src/components/shared/Stack'
import Line from '@/src/components/shared/Line'
import ThemeToggleButton from '../@header/_components/ThemeToggleButton'
import AuthButtonWithDropDown from './_components/AuthButtonWithDropDown'
import SidebarWriteButtonWithLogo from './_components/SidebarWriteButtonWithLogo'
import MenuButton from './_components/MenuButton'

export default function Sidebar() {
  const { me, session } = useMe()
  const [isHover, setHover] = useState(false)
  const pathname = usePathname()

  const handleToolTipOpen = () => {
    setHover(true)
  }

  const handleToolTipClose = () => {
    setHover(false)
  }

  return (
    <Container
      onMouseEnter={handleToolTipOpen}
      onMouseLeave={handleToolTipClose}
      data-status="closed"
      className="fixed bottom-4 z-40 m-4 hidden h-fit w-[64px] flex-shrink-0 rounded-lg bg-white p-2 shadow-md transition-all duration-300 ease-in-out sm:block lg:top-[calc(50%-80px)] lg:-translate-y-1/2 dark:bg-var-darkgray"
    >
      <YStack as="nav">
        <ZStack>
          <SidebarWriteButtonWithLogo
            closeToolTip={handleToolTipClose}
            isSelected={pathname === routes.post.new}
          />
          <ToolTip position="right" size="sm" isHover={isHover} text="글쓰기" />
        </ZStack>
        <Line />
        <YStack className="size-full">
          {TOP_NAVIGATE_MENUS.map((menu) => (
            <ZStack key={menu.id}>
              <MenuButton
                isSelected={
                  pathname === menu.path ||
                  pathname.split('/')[1] === menu.path.split('/')[1]
                }
                icon={menu.icon}
                name={menu.name}
                path={menu.path}
                closeToolTip={handleToolTipClose}
              />
              <ToolTip
                position="right"
                size="sm"
                isHover={isHover}
                text={menu.toolTip}
              />
            </ZStack>
          ))}
        </YStack>
        <YStack>
          {BOTTOM_NAVIGATE_MENUS.map((menu) => (
            <ZStack key={menu.id}>
              <MenuButton
                isSelected={pathname === menu.path}
                icon={menu.icon}
                name={menu.name}
                path={menu.path}
                closeToolTip={handleToolTipClose}
              />
              <ToolTip
                position="right"
                size="sm"
                isHover={isHover}
                text={menu.toolTip}
              />
            </ZStack>
          ))}
          <ZStack>
            <ThemeToggleButton />
            <ToolTip
              position="right"
              size="sm"
              isHover={isHover}
              text="테마 버튼"
            />
          </ZStack>
          <Line className="mb-2" />
          <ZStack>
            <AuthButtonWithDropDown
              me={me}
              pathname={pathname.split('/')[1]}
              userId={pathname.split('/')[2] || ''}
              session={session}
            />
            <ToolTip
              position="right"
              size="sm"
              isHover={isHover}
              text={me ? me.email : '게스트'}
            />
          </ZStack>
        </YStack>
      </YStack>
    </Container>
  )
}
