'use client'
import { useEffect, useState } from 'react'

export function Countdown({ nextTs, nextDateTh }: { nextTs: number; nextDateTh: string }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  const pad = (n: number) => String(Math.max(0,n)).padStart(2,'0')

  useEffect(() => {
    const tick = () => {
      const diff = nextTs - Date.now()
      if (diff <= 0) return
      setT({ d: Math.floor(diff/86400000), h: Math.floor((diff%86400000)/3600000), m: Math.floor((diff%3600000)/60000), s: Math.floor((diff%60000)/1000) })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [nextTs])

  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderTop: '3px solid var(--gold)', borderRadius: 24, padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <p style={{ fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--text3)' }}>งวดถัดไป</p>
        <p style={{ fontSize: '.82rem', fontWeight: 700, color: 'var(--gold)', textAlign: 'right' }}>{nextDateTh}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: '1rem' }}>
        {[['วัน',pad(t.d)],['ชม.',pad(t.h)],['นาที',pad(t.m)],['วิ',pad(t.s)]].map(([label,val],i) => (
          <>
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700, fontSize: '1.5rem', color: 'var(--text)', background: 'var(--surface)', borderRadius: 6, padding: '2px 8px', minWidth: '2.5ch', textAlign: 'center' }}>{val}</span>
              <span style={{ fontSize: '.55rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text3)' }}>{label}</span>
            </div>
            {i < 3 && <span key={`s${i}`} style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--border)', marginBottom: 16 }}>:</span>}
          </>
        ))}
      </div>
      <a href="/results" style={{ display: 'block', width: '100%', padding: '.65rem', background: 'var(--gold)', color: '#0f0f0f', fontWeight: 800, fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.1em', borderRadius: 8, textAlign: 'center' }}>
        ดูผลรางวัล →
      </a>
    </div>
  )
}
