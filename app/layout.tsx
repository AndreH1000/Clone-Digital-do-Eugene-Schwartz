import type { Metadata } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

export const metadata: Metadata = {
  title: 'Eugene Schwartz Brain - Digital Clone',
  description: 'Interface futurista para análise inteligente de leads com IA',
  keywords: 'Eugene Schwartz, marketing, leads, análise, IA, digital clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
