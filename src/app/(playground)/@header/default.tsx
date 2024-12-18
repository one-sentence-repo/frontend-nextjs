import { createServerClient } from '@/src/lib/supabase/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { meQuery } from '@/src/services/queries/auth/me-query'
import ThemeToggleButton from './_components/ThemeToggleButton'
import MenuButton from './_components/MenuButton'
import { Container } from '@/src/components/shared/Container'
import { XStack } from '@/src/components/shared/Stack'

export default function Default() {
  const supabase = createServerClient()
  const queryClient = getQueryClient()

  queryClient.prefetchQuery(meQuery.getUserSession(supabase))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container as="header" className="sticky top-0 z-50 sm:hidden">
        <div className="w-full rounded-md bg-white/60 p-2 shadow-lg backdrop-blur-xl lg:px-12 dark:bg-var-darkgray/60">
          <XStack className="h-full items-center justify-between">
            <MenuButton />
            <ThemeToggleButton isOpen viewToggle />
          </XStack>
        </div>
      </Container>
    </HydrationBoundary>
  )
}
