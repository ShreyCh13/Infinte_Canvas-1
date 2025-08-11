import { prisma } from '@/lib/prisma'
import { publicProcedure, router } from '@/lib/trpc'
import { z } from 'zod'

export const spacesRouter = router({
  list: publicProcedure.query(async () => {
    return prisma.space.findMany({ orderBy: { createdAt: 'asc' } })
  }),
  create: publicProcedure.input(z.object({ name: z.string().min(1) })).mutation(async ({ input }) => {
    return prisma.space.create({ data: { name: input.name } })
  }),
  get: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    return prisma.space.findUnique({ where: { id: input.id } })
  }),
})



