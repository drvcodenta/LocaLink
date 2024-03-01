import { Clerk } from '@clerk/nextjs/server'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Topbar from '@/components/shared/Topbar'
import LeftSideBar from '@/components/shared/LeftSideBar'
import RightSideBar from '@/components/shared/RightSideBar'
import Bottombar from '@/components/shared/Bottombar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LocaLink',
  description: 'Connect Locally'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Topbar />
        <main className='flex flex-row'>
          <LeftSideBar />
          <section className="main-container">
            <div className='w-full max-w-4'>
              {children}
            </div>
          </section>
          <RightSideBar />
        </main>
        <Bottombar />
        {children}
        </body>
    </html>
    </ClerkProvider>
  )
}
