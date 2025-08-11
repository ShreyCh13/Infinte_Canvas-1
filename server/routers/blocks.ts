import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { publicProcedure, router } from '@/lib/trpc'

export const blocksRouter = router({
  list: publicProcedure.input(z.object({ spaceId: z.string() })).query(async ({ input }) => {
    return prisma.block.findMany({ where: { spaceId: input.spaceId }, orderBy: { zIndex: 'asc' } })
  }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: z
          .object({})
          .passthrough()
          .optional(),
        title: z.string().nullable().optional(),
        x: z.number().optional(),
        y: z.number().optional(),
        width: z.number().optional(),
        height: z.number().optional(),
        status: z.enum(['NORMAL', 'PROPOSED', 'LOCKED']).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const block = await prisma.block.update({ where: { id: input.id }, data: input })
      await prisma.blockVersion.create({
        data: {
          blockId: block.id,
          data: block.data,
          title: block.title ?? undefined,
          status: block.status,
          createdById: block.createdById,
        },
      })
      return block
    }),
})


