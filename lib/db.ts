import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function getLatestDraw() {
  const { data } = await supabase
    .from('draw_results')
    .select('*')
    .order('draw_date', { ascending: false })
    .limit(1)
    .single()
  return data
}

export async function getDrawHistory(limit = 12) {
  const { data } = await supabase
    .from('draw_results')
    .select('id,draw_date,draw_date_th,first_prize,back_two,front_three,back_three')
    .order('draw_date', { ascending: false })
    .limit(limit)
  return data || []
}

export async function getDigitStats(draws = 60) {
  const { data } = await supabase
    .from('draw_results')
    .select('first_prize')
    .order('draw_date', { ascending: false })
    .limit(draws)
  if (!data) return []
  const freq: Record<string, number> = {}
  for (let i = 0; i <= 9; i++) freq[i.toString()] = 0
  data.forEach(r => r.first_prize.split('').forEach((d: string) => { freq[d] = (freq[d] || 0) + 1 }))
  const total = Object.values(freq).reduce((a, b) => a + b, 0)
  return Object.entries(freq)
    .map(([digit, count]) => ({ digit, count, pct: Math.round(count / total * 1000) / 10 }))
    .sort((a, b) => b.count - a.count)
}

export function getNextDraw() {
  const now = new Date()
  const y = now.getFullYear(), m = now.getMonth()
  const dates = [
    new Date(y, m, 1, 10, 0, 0), new Date(y, m, 16, 10, 0, 0),
    new Date(y, m + 1, 1, 10, 0, 0), new Date(y, m + 1, 16, 10, 0, 0),
  ]
  const next = dates.find(d => d > now) || dates[3]
  const diff = next.getTime() - now.getTime()
  const MONTHS = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม']
  return {
    ts: next.getTime(),
    date_th: `${next.getDate()} ${MONTHS[next.getMonth()]} ${next.getFullYear() + 543}`,
    days: Math.ceil(diff / 86400000),
  }
}
