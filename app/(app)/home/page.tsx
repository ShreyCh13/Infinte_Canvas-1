import Link from 'next/link'
import { getServerAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function HomePage() {
  const session = await getServerAuthSession()
  if (!session?.user) redirect('/login')

  const spaces = await prisma.space.findMany({
    where: { memberships: { some: { userId: session.user.id } } },
    orderBy: { createdAt: 'asc' },
  })

  return (
    <div className="h-dvh flex flex-col">
      <header className="h-14 border-b flex items-center px-4 justify-between">
        <div className="font-semibold">Infinite Canvas</div>
        <div className="text-sm">Signed in as {session.user.name}</div>
      </header>
      <main className="p-4 space-y-4">
        <h2 className="text-lg font-medium">Your Spaces</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {spaces.map((s) => (
            <li key={s.id} className="border rounded p-4 hover:shadow">
              <Link className="text-brand-700 hover:underline" href={`/space/${s.id}`}>
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}



