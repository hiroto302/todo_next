import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TODO List App',
  description: 'A simple TODO list application built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
