import '../../styles/globals.css'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import Providers from '@/components/providers/Providers'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-dvh w-dvw overflow-hidden`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}


