import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10)
  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: { email: 'alice@example.com', name: 'Alice', passwordHash },
  })
  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: { email: 'bob@example.com', name: 'Bob', passwordHash },
  })

  const space = await prisma.space.upsert({
    where: { id: 'seed-space' },
    update: {},
    create: { id: 'seed-space', name: 'Q3 GTM Plan', description: 'Demo space' },
  })

  await prisma.membership.upsert({
    where: { userId_spaceId: { userId: alice.id, spaceId: space.id } },
    update: {},
    create: { userId: alice.id, spaceId: space.id, role: 'OWNER' },
  })
  await prisma.membership.upsert({
    where: { userId_spaceId: { userId: bob.id, spaceId: space.id } },
    update: {},
    create: { userId: bob.id, spaceId: space.id, role: 'EDITOR' },
  })

  // Seed blocks
  const base = { spaceId: space.id, createdById: alice.id }
  await prisma.block.createMany({
    data: [
      {
        ...base,
        type: 'TABLE',
        title: 'Pipeline by Region',
        data: {
          columns: [
            { id: 'region', name: 'Region' },
            { id: 'pipeline', name: 'Pipeline ($k)' },
          ],
          rows: [
            { region: 'NA', pipeline: 1200 },
            { region: 'EMEA', pipeline: 900 },
            { region: 'APAC', pipeline: 700 },
          ],
        },
        x: 80,
        y: 80,
        width: 360,
        height: 200,
        cluster: 'Q3 Pipeline',
      },
      {
        ...base,
        type: 'CHART',
        title: 'Revenue by Month',
        data: {
          type: 'line',
          binding: { tableBlockId: 'none', x: 'month', y: ['revenue'] },
          annotations: [],
        },
        x: 500,
        y: 100,
        width: 420,
        height: 240,
        cluster: 'Q2 Revenue',
      },
      {
        ...base,
        type: 'METRIC',
        title: 'Q2 ARR = $12.4M',
        data: { label: 'Q2 ARR', value: 12.4, window: '90d', spark: [10, 11, 12.4] },
        x: 1000,
        y: 120,
        width: 220,
        height: 120,
        cluster: 'Q2 Revenue',
      },
      {
        ...base,
        type: 'TEXT',
        title: 'Executive Summary',
        data: { content: 'Q3 GTM plan focuses on APAC expansion and PLG motion.', style: 'P', mentions: [] },
        x: 120,
        y: 340,
        width: 420,
        height: 160,
      },
      {
        ...base,
        type: 'TASK',
        title: 'Finalize QBR deck',
        data: { status: 'TODO', priority: 'HIGH', links: [] },
        x: 600,
        y: 380,
        width: 300,
        height: 120,
        cluster: 'Q3 Pipeline',
      },
    ],
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })



