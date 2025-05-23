import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Resourch v2',
  description: 'Save all your resources in one place',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
