import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Canvas from '@/components/canvas/Canvas'
import { getServerAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function SpacePage({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession()
  if (!session?.user) redirect('/login')

  const space = await prisma.space.findUnique({
    where: { id: params.id },
    include: { blocks: true },
  })
  if (!space) return notFound()

  return (
    <div className="h-dvh w-dvw">
      <Canvas space={space} initialBlocks={space.blocks} userId={session.user.id} />
    </div>
  )
}



