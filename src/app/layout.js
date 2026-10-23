import { Inter, Oswald } from 'next/font/google'
import './globals.css'
import { PlanProvider } from '@/context/PlanContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' })

export const metadata = {
  title: 'FitLog — Workout Library',
  description: "Pick a lift, lock it into today's plan, and log every set.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="min-h-screen flex flex-col">
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </PlanProvider>
      </body>
    </html>
  )
}