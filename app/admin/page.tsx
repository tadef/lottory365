'use client'
import { useState } from 'react'

const ADMIN_PW = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

export default function AdminPage() {
  const [pw, setPw]       = useState('')
  const [auth, setAuth]   = useState(false)
  const [form, setForm]   = useState({ draw_date: '', draw_date_th: '', first_prize: '', back_two: '', front_three_1: '', front_three_2: '', back_three_1: '', back_three_2: '', nearby_above: '', nearby_below: '' })
  const [msg, setMsg]     = useState('')
  const [saving, setSave] = useState(false)

  const MONTHS = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม']
  const onDate = (v: string) => {
    const d = new Date(v)
    setForm(f => ({ ...f, draw_date: v, draw_date_th: !isNaN(d.getTime()) ? `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()+543}` : '' }))
  }

  function login() {
    if (!pw) { alert('กรุณากรอกรหัสผ่าน'); return }
    if (!ADMIN_PW) { alert('ยังไม่ได้ตั้งค่า NEXT_PUBLIC_ADMIN_PASSWORD ใน Vercel'); return }
    if (pw !== ADMIN_PW) { alert('รหัสผ่านไม่ถูกต้อง'); return }
    setAuth(true)
  }

  async function save() {
    if (!form.draw_date || !/^\d{6}$/.test(form.first_prize) || !/^\d{2}$/.test(form.back_two)) { setMsg('กรุณากรอกข้อมูลให้ครบและถูกต้อง'); return }
    setSave(true); setMsg('')
    try {
      const r = await fetch('/api/lotto/admin', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-key': pw }, body: JSON.stringify({ draw_date: form.draw_date, draw_date_th: form.draw_date_th, first_prize: form.first_prize, back_two: form.back_two, front_three: [form.front_three_1, form.front_three_2].filter(Boolean), back_three: [form.back_three_1, form.back_three_2].filter(Boolean), nearby_above: form.nearby_above || null, nearby_below: form.nearby_below || null }) })
      const j = await r.json()
      if (!r.ok) throw new Error(j.error)
      setMsg('✅ บันทึกสำเร็จ งวด ' + form.draw_date_th)
      setForm(f => ({ ...f, draw_date: '', draw_date_th: '', first_prize: '', back_two: '', front_three_1: '', front_three_2: '', back_three_1: '', back_three_2: '', nearby_above: '', nearby_below: '' }))
    } catch(e: any) { setMsg('❌ ' + e.message) }
    setSave(false)
  }

  const inp: React.CSSProperties = { width: '100%', background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 8, padding: '10px 14px', color: '#f0ece1', fontSize: '.95rem', outline: 'none', fontFamily: 'inherit' }
  const btn: React.CSSProperties = { background: '#c99b30', color: '#0f0f0f', border: 'none', borderRadius: 8, padding: '12px', fontWeight: 800, fontSize: '.85rem', textTransform: 'uppercase', letterSpacing: '.1em', cursor: 'pointer', width: '100%' }

  if (!auth) return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 20, padding: '2rem', width: '100%', maxWidth: 360 }}>
        <p style={{ fontWeight: 900, fontSize: '1.2rem', textAlign: 'center', marginBottom: '1.5rem', color: '#f0ece1' }}>LOTTORY<span style={{ color: '#c99b30' }}>365</span> Admin</p>
        <input type="password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') login() }} placeholder="รหัสผ่าน" style={{ ...inp, marginBottom: 12 }} />
        <button onClick={login} style={btn}>เข้าสู่ระบบ</button>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontWeight: 900, fontSize: '1.2rem', color: '#f0ece1' }}>กรอกผลรางวัล</h1>
          <button onClick={()=>setAuth(false)} style={{ background: 'none', border: '1px solid #2e2e2e', borderRadius: 6, padding: '4px 12px', color: '#6e6860', cursor: 'pointer', fontSize: '.75rem' }}>ออก</button>
        </div>
        {msg && <div style={{ marginBottom: '1rem', padding: '10px 14px', borderRadius: 10, background: msg.startsWith('✅') ? 'rgba(39,174,96,.1)' : 'rgba(199,62,62,.1)', border: `1px solid ${msg.startsWith('✅') ? 'rgba(39,174,96,.3)' : 'rgba(199,62,62,.3)'}`, color: '#f0ece1', fontSize: '.85rem' }}>{msg}</div>}
        <div style={{ background: '#1a1a1a', border: '1px solid #2e2e2e', borderRadius: 20, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div><label style={{ fontSize: '.65rem', fontWeight: 700, color: '#b8b0a0', display: 'block', marginBottom: 6 }}>วันที่ *</label><input type="date" value={form.draw_date} onChange={e=>onDate(e.target.value)} style={inp}/></div>
            <div><label style={{ fontSize: '.65rem', fontWeight: 700, color: '#b8b0a0', display: 'block', marginBottom: 6 }}>วันที่ (ไทย)</label><input value={form.draw_date_th} onChange={e=>setForm(f=>({...f,draw_date_th:e.target.value}))} style={inp} placeholder="16 มกราคม 2568"/></div>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #2e2e2e' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div><label style={{ fontSize: '.65rem', fontWeight: 700, color: '#b8b0a0', display: 'block', marginBottom: 6 }}>รางวัลที่ 1 * (6 หลัก)</label><input value={form.first_prize} onChange={e=>setForm(f=>({...f,first_prize:e.target.value.replace(/\D/g,'').slice(0,6)}))} style={{...inp,textAlign:'center',letterSpacing:4,fontSize:'1.2rem',fontFamily:'monospace'}} placeholder="000000" maxLength={6}/></div>
            <div><label style={{ fontSize: '.65rem', fontWeight: 700, color: '#b8b0a0', display: 'block', marginBottom: 6 }}>ท้าย 2 ตัว * (2 หลัก)</label><input value={form.back_two} onChange={e=>setForm(f=>({...f,back_two:e.target.value.replace(/\D/g,'').slice(0,2)}))} style={{...inp,textAlign:'center',letterSpacing:4,fontSize:'1.2rem',fontFamily:'monospace'}} placeholder="00" maxLength={2}/></div>
            <div><label style={{ fontSize: '.65rem', fontWeight: 700, color: '#b8b0a0', display: 'block', marginBottom: 6 }}>หน้า 3 ตัว (1)</label><input value={form.front_three_1} onChange={e=>setForm(f=>({...f,front_three_1:e.target.value.replace(/\D/g,'').slice(0,3)}))} style={{...inp,textAlign:'center',letterSpacing:3,fontFamily:'monospace'}} placeholder="000" maxLength={3}/></div>
            <div><label style={{ fontSize: '.65rem', fontWeight: 700, color: '#b8b0a0', display: 'block', marginBottom: 6 }}>หน้า 3 ตัว (2)</label><input value={form.front_three_2} onChange={e=>setForm(f=>({...f,front_three_2:e.target.value.replace(/\D/g,'').slice(0,3)}))} style={{...inp,textAlign:'center',letterSpacing:3,fontFamily:'monospace'}} placeholder="000" maxLength={3}/></div>
            <div><label style={{ fontSize: '.65rem', fontWeight: 700, color: '#b8b0a0', display: 'block', marginBottom: 6 }}>ท้าย 3 ตัว (1)</label><input value={form.back_three_1} onChange={e=>setForm(f=>({...f,back_three_1:e.target.value.replace(/\D/g,'').slice(0,3)}))} style={{...inp,textAlign:'center',letterSpacing:3,fontFamily:'monospace'}} placeholder="000" maxLength={3}/></div>
            <div><label style={{ fontSize: '.65rem', fontWeight: 700, color: '#b8b0a0', display: 'block', marginBottom: 6 }}>ท้าย 3 ตัว (2)</label><input value={form.back_three_2} onChange={e=>setForm(f=>({...f,back_three_2:e.target.value.replace(/\D/g,'').slice(0,3)}))} style={{...inp,textAlign:'center',letterSpacing:3,fontFamily:'monospace'}} placeholder="000" maxLength={3}/></div>
            <div><label style={{ fontSize: '.65rem', fontWeight: 700, color: '#b8b0a0', display: 'block', marginBottom: 6 }}>ข้างเคียงบน</label><input value={form.nearby_above} onChange={e=>setForm(f=>({...f,nearby_above:e.target.value.replace(/\D/g,'').slice(0,6)}))} style={{...inp,fontFamily:'monospace'}} placeholder="000000" maxLength={6}/></div>
            <div><label style={{ fontSize: '.65rem', fontWeight: 700, color: '#b8b0a0', display: 'block', marginBottom: 6 }}>ข้างเคียงล่าง</label><input value={form.nearby_below} onChange={e=>setForm(f=>({...f,nearby_below:e.target.value.replace(/\D/g,'').slice(0,6)}))} style={{...inp,fontFamily:'monospace'}} placeholder="000000" maxLength={6}/></div>
          </div>
          <button onClick={save} disabled={saving} style={{...btn, opacity: saving ? .6 : 1}}>{saving ? 'กำลังบันทึก...' : 'บันทึกผลรางวัล'}</button>
        </div>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}><a href="/" style={{ fontSize: '.72rem', color: '#6e6860' }}>← กลับหน้าหลัก</a></p>
      </div>
    </div>
  )
}
