export const runtime = 'edge'
const rooms = new Map<string, Set<WebSocket>>()

export function GET(request: Request) {
  const { socket, response } = Deno.upgradeWebSocket(request)
  const url = new URL(request.url)
  const spaceId = url.searchParams.get('spaceId') ?? 'default'

  socket.addEventListener('open', () => {
    let set = rooms.get(spaceId)
    if (!set) {
      set = new Set()
      rooms.set(spaceId, set)
    }
    set.add(socket)
  })

  socket.addEventListener('message', (event) => {
    const peers = rooms.get(spaceId)
    if (!peers) return
    for (const peer of peers) {
      if (peer !== socket) {
        try {
          peer.send(event.data)
        } catch {}
      }
    }
  })

  socket.addEventListener('close', () => {
    const set = rooms.get(spaceId)
    if (set) set.delete(socket)
  })

  return response
}


