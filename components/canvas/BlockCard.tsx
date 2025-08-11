"use client"
import type { Block } from '@prisma/client'

export default function BlockCard({ block }: { block: Block }) {
  return (
    <div className="bg-white/90 backdrop-blur border rounded shadow-sm w-full h-full flex flex-col">
      <div className="h-8 border-b flex items-center px-2 text-sm justify-between">
        <span>{block.title ?? block.type}</span>
        {block.status === 'PROPOSED' && (
          <span className="text-xs bg-yellow-100 text-yellow-800 rounded px-1">Proposed</span>
        )}
      </div>
      <div className="flex-1 p-2 text-xs text-gray-600 overflow-auto">
        <pre className="whitespace-pre-wrap">{JSON.stringify(block.data, null, 2)}</pre>
      </div>
    </div>
  )
}



