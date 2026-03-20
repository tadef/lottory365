'use client'
import { useState } from 'react'

export function LuckySpinner() {
  const [nums, setNums]     = useState(['?','?','?'])
  const [spinning, setSpin] = useState(false)
  const [done, setDone]     = useState(false)
  const [copied, setCopied] = useState(false)

  function spin() {
    if (spinning) return
    setSpin(true); setDone(false); setCopied(false)
    let count = 0
    const id = setInterval(() => {
      setNums([0,1,2].map(() => String(Math.floor(Math.random()*10))))
      if (++count >= 20) {
        clearInterval(id)
        setSpin(false); setDone(true)
      }
    }, 65)
  }

  function copy() {
    navigator.clipboard.writeText(nums.join(''))
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  function share() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://lottory365.com')}&quote=${encodeURIComponent('เลขมงคลวันนี้: ' + nums.join('') + ' จาก LOTTORY365 (เพื่อความบันเทิงเท่านั้น)')}`,
      '_blank', 'width=600,height=400'
    )
  }

  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderTop: '3px solid var(--gold)', borderRadius: 24, padding: '2rem 1.5rem', textAlign: 'center' }}>
      <p style={{ fontSize: '.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.22em', color: 'var(--gold)', marginBottom: 4 }}>✦ Lucky Number Tool ✦</p>
      <h2 style={{ fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-.02em', lineHeight: 1.2, marginBottom: '1.75rem' }}>
        สุ่มเลขมงคล<br /><span style={{ color: 'var(--gold)' }}>ประจำวัน</span>
      </h2>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: '1.5rem' }}>
        {nums.map((d, i) => (
          <div key={i} style={{
            width: 'clamp(64px,16vw,80px)', height: 'clamp(86px,20vw,104px)',
            background: 'var(--surface)', border: `1.5px solid ${spinning ? 'var(--gold)' : 'var(--border)'}`,
            borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700,
            fontSize: 'clamp(2.6rem,6vw,3.2rem)',
            color: spinning ? 'var(--gold)' : 'var(--text)',
            transition: 'border-color .1s, color .1s',
          }}>
            {d}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <button onClick={spin} disabled={spinning} style={{
          background: 'var(--gold)', color: '#0f0f0f',
          border: 'none', borderRadius: 8, cursor: 'pointer',
          fontWeight: 900, fontSize: '.85rem', textTransform: 'uppercase', letterSpacing: '.1em',
          padding: '.875rem 2.5rem', opacity: spinning ? .7 : 1,
          transition: 'opacity .15s',
        }}>
          {spinning ? 'กำลังสุ่ม...' : done ? 'สุ่มใหม่' : 'กดรับเลขมงคล'}
        </button>

        {done && (
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={copy} style={{ background: 'var(--surface)', color: 'var(--text2)', border: '1px solid var(--border)', borderRadius: 6, cursor: 'pointer', fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', padding: '.6rem 1rem' }}>
              {copied ? '✓ คัดลอก' : 'คัดลอก'}
            </button>
            <button onClick={share} style={{ background: '#1877F2', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', padding: '.6rem 1rem' }}>
              แชร์
            </button>
          </div>
        )}
      </div>
      <p style={{ fontSize: '.62rem', color: 'var(--text3)', marginTop: '1.25rem' }}>เพื่อความบันเทิงเท่านั้น — ไม่ใช่คำแนะนำในการซื้อสลาก</p>
    </div>
  )
}
