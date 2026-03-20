import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { key } = await req.json()
  if (key === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
    return NextResponse.json({ ok: true })
  }
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
