import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'].filter(() => process.env.NODE_ENV === 'development') as any,
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}



