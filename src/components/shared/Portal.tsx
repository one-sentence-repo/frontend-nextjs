'use client'

import { isServer } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

export default function Portal({ children }: PropsWithChildren) {
  if (isServer) return null

  const element = document.getElementById('portal')

  return element ? createPortal(children, element) : null
}
