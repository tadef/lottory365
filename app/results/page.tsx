import { getDrawHistory } from '@/lib/db'

export const revalidate = 1800

export default async function ResultsPage() {
  const history = await getDrawHistory(48)
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{ background: 'rgba(15,15,15,.95)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 1rem', height: 56, display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <a href="/" style={{ fontWeight: 900, fontSize: '1.05rem' }}>LOTTORY<span style={{ color: 'var(--gold)' }}>365</span></a>
          <a href="/results" style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--gold)' }}>ผลรางวัล</a>
          <a href="/stats" style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--text3)' }}>สถิติ</a>
        </div>
      </nav>
      <header style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '2rem 1rem 3rem' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <h1 style={{ fontWeight: 900, fontSize: 'clamp(1.75rem,4vw,3rem)', letterSpacing: '-.03em' }}>ผลรางวัล<span style={{ color: 'var(--gold)' }}>ย้อนหลัง</span></h1>
          <p style={{ fontSize: '.85rem', color: 'var(--text3)', marginTop: 8 }}>ข้อมูล {history.length} งวดล่าสุด</p>
        </div>
      </header>
      <main style={{ maxWidth: 1180, margin: '0 auto', padding: '1rem 1rem 4rem' }}>
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480 }}>
              <thead>
                <tr style={{ background: 'var(--surface)' }}>
                  {['งวดวันที่','รางวัลที่ 1','ท้าย 2 ตัว','ท้าย 3 ตัว','หน้า 3 ตัว'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', fontSize: '.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text3)', textAlign: h === 'งวดวันที่' ? 'left' : 'center', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {history.map((row: any, i: number) => (
                  <tr key={row.id} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,.015)' }}>
                    <td style={{ padding: '12px 16px', fontSize: '.8rem', color: 'var(--text2)' }}>{row.draw_date_th}</td>
                    <td style={{ padding: '12px 16px', fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700, fontSize: '1.1rem', letterSpacing: '4px', color: 'var(--gold)', textAlign: 'center' }}>{row.first_prize?.padStart(6,'0')}</td>
                    <td style={{ padding: '12px 16px', fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700, color: 'var(--red)', textAlign: 'center' }}>{row.back_two?.padStart(2,'0') || '—'}</td>
                    <td style={{ padding: '12px 16px', fontFamily: "'IBM Plex Mono',monospace", fontSize: '.9rem', color: 'var(--text2)', textAlign: 'center' }}>{row.back_three?.map((n: string) => n.padStart(3,'0')).join(' / ') || '—'}</td>
                    <td style={{ padding: '12px 16px', fontFamily: "'IBM Plex Mono',monospace", fontSize: '.9rem', color: 'var(--text2)', textAlign: 'center' }}>{row.front_three?.map((n: string) => n.padStart(3,'0')).join(' / ') || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p style={{ fontSize: '.65rem', color: 'var(--text3)', textAlign: 'center', marginTop: '1.25rem' }}>ข้อมูลเพื่อความบันเทิงเท่านั้น ไม่สนับสนุนการพนัน</p>
      </main>
    </div>
  )
}
