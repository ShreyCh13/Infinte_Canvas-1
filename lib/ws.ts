const WS_URL =
  typeof window !== 'undefined' && location.protocol === 'https:'
    ? `wss://${location.host}/api/ws`
    : `ws://${typeof window !== 'undefined' ? location.host : 'localhost:3000'}/api/ws`

export function createClientWs(spaceId: string, userId: string) {
  const ws = new WebSocket(`${WS_URL}?spaceId=${encodeURIComponent(spaceId)}&userId=${encodeURIComponent(userId)}`)
  return ws
}



