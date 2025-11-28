import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '600', '700'],
  variable: '--font-montserrat'
})

export const metadata: Metadata = {
  title: 'Rhythmus - AI кардиодиагностика для вашей клиники',
  description: 'Казахстанская облачная ИИ-экосистема Rhythmus решает проблему кадрового дефицита и помогает вашим врачам справляться с растущим потоком пациентов.',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={montserrat.variable}>
      <body className="font-montserrat">{children}</body>
    </html>
  )
}