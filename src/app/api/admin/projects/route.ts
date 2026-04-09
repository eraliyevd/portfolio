import { NextRequest, NextResponse } from 'next/server'
import { getData, saveData } from '@/lib/data'

export async function POST(req: NextRequest) {
  try {
    const projects = await req.json()
    const data = getData()
    data.projects = projects
    saveData(data)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save projects' }, { status: 500 })
  }
}
