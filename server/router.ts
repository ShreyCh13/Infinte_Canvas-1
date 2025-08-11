import { router } from '@/lib/trpc'
import { blocksRouter } from './routers/blocks'
import { spacesRouter } from './routers/spaces'

export const appRouter = router({
  blocks: blocksRouter,
  spaces: spacesRouter,
})

export type AppRouter = typeof appRouter



