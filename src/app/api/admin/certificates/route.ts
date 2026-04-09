import { NextRequest, NextResponse } from 'next/server'
import { getData, saveData } from '@/lib/data'

export async function POST(req: NextRequest) {
  try {
    const certificates = await req.json()
    const data = getData()
    data.certificates = certificates
    saveData(data)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save certificates' }, { status: 500 })
  }
}
