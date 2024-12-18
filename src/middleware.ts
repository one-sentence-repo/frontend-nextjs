import { NextRequest } from 'next/server'
import { updateSession } from '@/src/lib/supabase/middleware'

export default function middleware(req: NextRequest) {
  return updateSession(req)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
