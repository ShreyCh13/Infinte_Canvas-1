import { NextRequest } from 'next/server'
import { writeFile } from 'fs/promises'
import { randomUUID } from 'crypto'
import { join } from 'path'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as unknown as File | null
  if (!file) return new Response('No file', { status: 400 })
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const filename = `${randomUUID()}-${file.name}`
  const filePath = join(process.cwd(), 'public', 'uploads', filename)
  await writeFile(filePath, buffer)
  return Response.json({ url: `/uploads/${filename}` })
}



