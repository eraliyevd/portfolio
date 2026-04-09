import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Determine subfolder
    const isImage = file.type.startsWith('image/')
    const folder = isImage ? 'images' : 'certificates'
    const dir = path.join(process.cwd(), 'public', folder)
    
    try { mkdirSync(dir, { recursive: true }) } catch {}

    // Sanitize filename
    const ext = file.name.split('.').pop()
    const safeName = `upload_${Date.now()}.${ext}`
    writeFileSync(path.join(dir, safeName), buffer)

    return NextResponse.json({ path: `/${folder}/${safeName}` })
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
