import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en" className="h-full">
      <body className={`${inter.className} bg-black text-white h-full`}>
        {children}
      </body>
    </html>
  )
}
