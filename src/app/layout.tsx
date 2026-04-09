import type { Metadata } from 'next'
import './globals.css'
import { SettingsProvider } from '@/components/ui/SettingsProvider'

export const metadata: Metadata = {
  title: 'Eraliyev Doniyor — Engineering & AI',
  description: 'Mechanical Engineering Student & AI Developer. Building intelligent systems at the intersection of engineering and technology.',
  keywords: ['Mechanical Engineering', 'AI Developer', 'Bot Developer', 'University Application'],
  openGraph: {
    title: 'Eraliyev Doniyor — Engineering & AI',
    description: 'Mechanical Engineering Student & AI Developer',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="grain">
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  )
}
