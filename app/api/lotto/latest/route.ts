import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getNextDraw } from '@/lib/db'

export const revalidate = 3600

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  const { data } = await supabase
    .from('draw_results')
    .select('*')
    .order('draw_date', { ascending: false })
    .limit(1)
    .single()
  return NextResponse.json({ draw: data, next_draw: getNextDraw() })
}
