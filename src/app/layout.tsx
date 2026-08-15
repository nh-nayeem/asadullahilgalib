import './globals.css'
import type { Metadata } from 'next'
import { Courier_Prime } from 'next/font/google'
import SiteAnalytics from '@/components/SiteAnalytics'

const courierPrime = Courier_Prime({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-typewriter',
})

export const metadata: Metadata = {
  title: 'Asadullahil Galib — Filmmaker',
  description: 'Portfolio website of Asadullahil Galib, independent filmmaker and storyteller.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`h-full ${courierPrime.variable}`}>
      <body className={`min-h-full ${courierPrime.className} bg-black text-white antialiased`}>
        {children}
        <SiteAnalytics />
      </body>
    </html>
  )
}
