import { NextRequest, NextResponse } from 'next/server'
import { getData, saveData } from '@/lib/data'

export async function POST(req: NextRequest) {
  try {
    const profile = await req.json()
    const data = getData()
    data.profile = profile
    saveData(data)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 })
  }
}
