import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
  weight: ['400', '500', '600', '700'],
  preload: true,
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
    <html lang="en" className={`h-full ${robotoMono.variable} font-sans`}>
      <body className="min-h-full bg-black text-white antialiased">
        {children}
      </body>
    </html>
  )
}
