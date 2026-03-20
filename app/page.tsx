import { getLatestDraw, getDrawHistory, getDigitStats, getNextDraw } from '@/lib/db'
import { LuckySpinner } from '@/components/LuckySpinner'
import { Countdown }    from '@/components/Countdown'

export const revalidate = 1800

export default async function Page() {
  const [draw, history, stats, next] = await Promise.all([
    getLatestDraw(),
    getDrawHistory(10),
    getDigitStats(60),
    Promise.resolve(getNextDraw()),
  ])

  const fp = draw?.first_prize?.padStart(6, '0') || '------'
  const digits = fp.split('')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* NAV */}
      <nav style={{ background: 'rgba(15,15,15,.95)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 1rem', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, background: 'var(--gold)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 12, color: '#0f0f0f' }}>L</div>
            <span style={{ fontWeight: 900, fontSize: '1.05rem', letterSpacing: '-.02em' }}>LOTTORY<span style={{ color: 'var(--gold)' }}>365</span></span>
          </a>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '.8rem', fontWeight: 700 }}>
            <a href="/" style={{ color: 'var(--text2)' }}>หน้าหลัก</a>
            <a href="/results" style={{ color: 'var(--text2)' }}>ผลรางวัล</a>
            <a href="/stats" style={{ color: 'var(--text2)' }}>สถิติ</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '2.5rem 1rem 4rem' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <p style={{ fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.2em', color: 'var(--text3)', marginBottom: '1rem' }}>
            อัปเดตล่าสุด — งวด {draw?.draw_date_th || '—'}
          </p>
          <h1 style={{ fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.5rem)', lineHeight: 1.05, letterSpacing: '-.03em', marginBottom: '.75rem' }}>
            ข้อมูลสลาก<br /><span style={{ color: 'var(--gold)' }}>LOTTORY365</span>
          </h1>
          <p style={{ fontSize: '.85rem', color: 'var(--text3)', maxWidth: 400, marginBottom: '1.75rem' }}>
            สถิติตัวเลข ผลรางวัลย้อนหลัง — เนื้อหาเพื่อความบันเทิง ไม่สนับสนุนการพนัน
          </p>
          {/* Strip */}
          <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', maxWidth: 560 }}>
            {[
              { label: 'รางวัลที่ 1', val: fp },
              { label: 'งวดถัดไปใน', val: `${next.days} วัน` },
              { label: 'ท้าย 2 ตัว', val: draw?.back_two?.padStart(2,'0') || '——' },
            ].map((item, i) => (
              <div key={i} style={{ flex: 1, padding: '.875rem 1.25rem', background: 'var(--card)', borderRight: i < 2 ? '1px solid var(--border)' : 'none' }}>
                <p style={{ fontSize: '.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--text3)', marginBottom: 4 }}>{item.label}</p>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: '1.2rem', color: 'var(--gold)', letterSpacing: '.04em' }}>{item.val}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ maxWidth: 1180, margin: '0 auto', padding: '0 1rem 4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginTop: '-2rem', position: 'relative', zIndex: 10 }}>

          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Lucky Spinner */}
            <LuckySpinner />

            {/* Prize Card */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderTop: '3px solid var(--gold)', borderRadius: 24, padding: '1.75rem', textAlign: 'center' }}>
              <p style={{ fontSize: '.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.2em', color: 'var(--red)', marginBottom: 4 }}>รางวัลที่ 1</p>
              <p style={{ fontSize: '.78rem', color: 'var(--text3)', marginBottom: '1.25rem' }}>งวดวันที่ {draw?.draw_date_th || '—'}</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: '1.25rem' }}>
                {digits.map((d, i) => (
                  <div key={i} style={{ width: 'clamp(40px,9vw,54px)', height: 'clamp(56px,12vw,72px)', background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700, fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', color: 'var(--gold)' }}>
                    {d}
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, maxWidth: 320, margin: '0 auto' }}>
                {draw?.back_two && (
                  <div style={{ background: 'rgba(199,62,62,.08)', border: '1px solid rgba(199,62,62,.25)', borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
                    <p style={{ fontSize: '.55rem', fontWeight: 700, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 4 }}>ท้าย 2</p>
                    <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 900, fontSize: '1.5rem', color: 'var(--red)' }}>{draw.back_two.padStart(2,'0')}</p>
                  </div>
                )}
                {draw?.front_three?.[0] && (
                  <div style={{ background: 'rgba(201,155,48,.08)', border: '1px solid rgba(201,155,48,.25)', borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
                    <p style={{ fontSize: '.55rem', fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 4 }}>หน้า 3</p>
                    <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700, fontSize: '1.2rem', color: 'var(--gold)' }}>{draw.front_three[0].padStart(3,'0')}</p>
                  </div>
                )}
                {draw?.back_three?.[0] && (
                  <div style={{ background: 'rgba(201,155,48,.08)', border: '1px solid rgba(201,155,48,.25)', borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
                    <p style={{ fontSize: '.55rem', fontWeight: 700, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 4 }}>ท้าย 3</p>
                    <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700, fontSize: '1.2rem', color: 'var(--gold)' }}>{draw.back_three[0].padStart(3,'0')}</p>
                  </div>
                )}
              </div>
              <p style={{ fontSize: '.6rem', color: 'var(--text3)', marginTop: '1rem' }}>ข้อมูลเพื่อความบันเทิงเท่านั้น ไม่สนับสนุนการพนัน</p>
            </div>

            {/* History Table */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden' }}>
              <div style={{ padding: '1rem 1.25rem .75rem', borderBottom: '1px solid var(--border)' }}>
                <p style={{ fontSize: '.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text2)' }}>ผลรางวัลย้อนหลัง</p>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--surface)' }}>
                      {['งวดวันที่','รางวัลที่ 1','ท้าย 2','ท้าย 3'].map(h => (
                        <th key={h} style={{ padding: '10px 16px', fontSize: '.62rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text3)', textAlign: h === 'งวดวันที่' ? 'left' : 'center', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((row: any, i: number) => (
                      <tr key={row.id} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,.015)' }}>
                        <td style={{ padding: '10px 16px', fontSize: '.78rem', color: 'var(--text2)' }}>{row.draw_date_th}</td>
                        <td style={{ padding: '10px 16px', fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700, fontSize: '1rem', letterSpacing: '3px', color: 'var(--gold)', textAlign: 'center' }}>{row.first_prize?.padStart(6,'0') || '——'}</td>
                        <td style={{ padding: '10px 16px', fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700, color: 'var(--red)', textAlign: 'center' }}>{row.back_two?.padStart(2,'0') || '—'}</td>
                        <td style={{ padding: '10px 16px', fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600, fontSize: '.85rem', color: 'var(--text2)', textAlign: 'center' }}>{row.back_three?.[0]?.padStart(3,'0') || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stats */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 20, padding: '1.25rem' }}>
              <p style={{ fontSize: '.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text2)', marginBottom: '1.25rem' }}>ความถี่ตัวเลข 0–9 (60 งวดล่าสุด)</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {stats.map((s: any) => (
                  <div key={s.digit} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700, fontSize: '1.1rem', color: 'var(--text)', width: 16, textAlign: 'center', flexShrink: 0 }}>{s.digit}</span>
                    <div style={{ flex: 1, height: 8, background: 'var(--surface)', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: s.pct > 15 ? 'var(--gold)' : 'var(--border)', borderRadius: 99, width: `${s.pct * 2}%`, transition: 'width .5s ease' }} />
                    </div>
                    <span style={{ fontSize: '.7rem', fontWeight: 700, color: 'var(--text3)', width: 40, textAlign: 'right', flexShrink: 0 }}>{s.count}×</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '.6rem', color: 'var(--text3)', marginTop: '1rem', textAlign: 'center' }}>ข้อมูลสถิติเพื่อความบันเทิง ไม่สามารถทำนายผลได้</p>
            </div>

          </div>

          {/* Sidebar — desktop only via CSS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Countdown nextTs={next.ts} nextDateTh={next.date_th} />
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '2rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <p style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: 8 }}>LOTTORY<span style={{ color: 'var(--gold)' }}>365</span></p>
          <p style={{ fontSize: '.72rem', color: 'var(--text3)', maxWidth: 480, margin: '0 auto', lineHeight: 1.8 }}>
            เนื้อหาทั้งหมดเพื่อความบันเทิงและข้อมูลทั่วไปเท่านั้น ไม่สนับสนุนการพนันในทุกรูปแบบ<br />
            © {new Date().getFullYear()} LOTTORY365
          </p>
        </div>
      </footer>

      {/* Mobile Nav */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 60, background: 'rgba(15,15,15,.96)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }} className="md:hidden">
        {[['🏠','หน้าหลัก','/'],['🎰','ผลรางวัล','/results'],['📊','สถิติ','/stats'],['✍️','บทความ','/articles']].map(([icon,label,href]) => (
          <a key={href} href={href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, color: 'var(--text3)', flex: 1 }}>
            <span style={{ fontSize: '1.1rem' }}>{icon}</span>
            <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.04em' }}>{label}</span>
          </a>
        ))}
      </nav>

    </div>
  )
}
