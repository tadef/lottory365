import { getDigitStats } from '@/lib/db'
export const revalidate = 1800
export default async function StatsPage() {
  const stats = await getDigitStats(60)
  const max = stats[0]?.count || 1
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{ background: 'rgba(15,15,15,.95)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 1rem', height: 56, display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <a href="/" style={{ fontWeight: 900, fontSize: '1.05rem' }}>LOTTORY<span style={{ color: 'var(--gold)' }}>365</span></a>
          <a href="/results" style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--text3)' }}>ผลรางวัล</a>
          <a href="/stats" style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--gold)' }}>สถิติ</a>
        </div>
      </nav>
      <header style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '2rem 1rem 3rem' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <h1 style={{ fontWeight: 900, fontSize: 'clamp(1.75rem,4vw,3rem)', letterSpacing: '-.03em' }}>สถิติ<span style={{ color: 'var(--gold)' }}>ตัวเลข</span></h1>
          <p style={{ fontSize: '.85rem', color: 'var(--text3)', marginTop: 8 }}>วิเคราะห์จาก 60 งวดล่าสุด — เพื่อความบันเทิงเท่านั้น</p>
        </div>
      </header>
      <main style={{ maxWidth: 1180, margin: '0 auto', padding: '1.5rem 1rem 4rem' }}>
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 20, padding: '1.5rem' }}>
          <p style={{ fontSize: '.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--text2)', marginBottom: '1.5rem' }}>ความถี่ตัวเลข 0–9 (รางวัลที่ 1)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {stats.map((s: any) => (
              <div key={s.digit} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700, fontSize: '1.2rem', color: 'var(--text)', width: 20, textAlign: 'center', flexShrink: 0 }}>{s.digit}</span>
                <div style={{ flex: 1, height: 10, background: 'var(--surface)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: s.pct > 12 ? 'var(--gold)' : 'var(--border)', borderRadius: 99, width: `${(s.count/max)*100}%` }} />
                </div>
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '.78rem', fontWeight: 700, color: 'var(--text3)', width: 48, textAlign: 'right', flexShrink: 0 }}>{s.count}× {s.pct}%</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '.6rem', color: 'var(--text3)', marginTop: '1.25rem', textAlign: 'center' }}>สถิติเพื่อความบันเทิง ไม่สามารถทำนายผลรางวัลได้</p>
        </div>
      </main>
    </div>
  )
}
