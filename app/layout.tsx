import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LOTTORY365 — ข้อมูลสลากกินแบ่งรัฐบาล',
  description: 'สถิติตัวเลข ผลรางวัล เพื่อความบันเทิงเท่านั้น ไม่สนับสนุนการพนัน',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;600;700&family=IBM+Plex+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
