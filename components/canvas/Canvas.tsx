"use client"
import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Rnd } from 'react-rnd'
import { createClientWs } from '@/lib/ws'
import type { Block, Space } from '@prisma/client'
import BlockCard from './BlockCard'
import { trpc } from '@/lib/trpcClient'

type CanvasProps = {
  space: Space
  initialBlocks: Block[]
  userId: string
}

const Tldraw = dynamic(async () => (await import('@tldraw/tldraw')).Tldraw, { ssr: false })

export default function Canvas({ space, initialBlocks, userId }: CanvasProps) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks)
  const wsRef = useRef<WebSocket | null>(null)
  const updateMutation = trpc.blocks.update.useMutation()

  useEffect(() => {
    const ws = createClientWs(space.id, userId)
    wsRef.current = ws
    ws.addEventListener('message', (ev) => {
      try {
        const msg = JSON.parse(ev.data as string)
        if (msg.type === 'block:update') {
          setBlocks((prev) => prev.map((b) => (b.id === msg.block.id ? msg.block : b)))
        }
      } catch {}
    })
    return () => ws.close()
  }, [space.id, userId])

  function broadcast(update: unknown) {
    wsRef.current?.send(JSON.stringify(update))
  }

  return (
    <div className="h-full w-full relative subtle-grid overflow-hidden">
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          {blocks.map((b) => (
            <Rnd
              key={b.id}
              default={{ x: b.x, y: b.y, width: b.width, height: b.height }}
              bounds="parent"
              onDragStop={async (_, d) => {
                const updated = { ...b, x: d.x, y: d.y }
                setBlocks((prev) => prev.map((it) => (it.id === b.id ? updated : it)))
                broadcast({ type: 'block:update', block: updated })
                try {
                  const saved = await updateMutation.mutateAsync({ id: b.id, x: d.x, y: d.y })
                  setBlocks((prev) => prev.map((it) => (it.id === b.id ? saved : it)))
                } catch (e) {
                  // ignore
                }
              }}
              onResizeStop={async (_, __, ref, ___, pos) => {
                const width = parseFloat(ref.style.width)
                const height = parseFloat(ref.style.height)
                const updated = { ...b, x: pos.x, y: pos.y, width, height }
                setBlocks((prev) => prev.map((it) => (it.id === b.id ? updated : it)))
                broadcast({ type: 'block:update', block: updated })
                try {
                  const saved = await updateMutation.mutateAsync({
                    id: b.id,
                    x: pos.x,
                    y: pos.y,
                    width,
                    height,
                  })
                  setBlocks((prev) => prev.map((it) => (it.id === b.id ? saved : it)))
                } catch (e) {
                  // ignore
                }
              }}
            >
              <BlockCard block={b} />
            </Rnd>
          ))}
        </div>
      </div>
    </div>
  )
}


