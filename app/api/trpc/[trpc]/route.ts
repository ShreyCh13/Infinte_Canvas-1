import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/server/router'
export const runtime = 'edge'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
  })

export { handler as GET, handler as POST }


