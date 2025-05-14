import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppProvider } from '@/context/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FutureFund | Private Market Fund Management',
  description: 'A modern platform for creating and subscribing to private market funds',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
            <div className="absolute left-[calc(50%-500px)] top-[-300px] h-[600px] w-[1000px] rounded-full bg-blue-500/20 blur-[100px]" />
            <div className="absolute right-[-400px] top-[calc(50%-400px)] h-[800px] w-[800px] rounded-full bg-purple-500/20 blur-[100px]" />
          </div>
          <AppProvider>
            {children}
          </AppProvider>
        </div>
      </body>
    </html>
  )
}
