import { NextResponse } from 'next/server'
import { getData } from '@/lib/data'

export async function GET() {
  try {
    const data = getData()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 })
  }
}
