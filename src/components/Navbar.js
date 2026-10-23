'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { usePlan } from '@/context/PlanContext'

export default function Navbar() {
    const pathname = usePathname()
    const { plan, saved } = usePlan()

    const isWorkout = pathname === '/' || pathname.startsWith('/workout')
    const isPlan = pathname.startsWith('/my-plan')

    const linkClass = (active) =>
        `px-3 py-1.5 rounded-md text-sm font-medium transition ${active ? 'bg-white/10 text-accent' : 'text-muted hover:text-white'
        }`

    return (
        <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur border-b border-white/10">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
                <Link href="/" className="flex items-center gap-2">
                    <img src="/logo.png" alt="FitLog logo" className="h-8 w-auto" />
                    <span className="font-display text-xl tracking-wide hidden sm:inline">FITLOG</span>
                </Link>

                {/* Middle: links */}
                <nav className="flex items-center gap-1">
                    <Link href="/" className={linkClass(isWorkout)}>Workout</Link>
                    <Link href="/my-plan" className={linkClass(isPlan)}>My Plan</Link>
                </nav>

                {/* Right: badges */}
                <div className="flex items-center gap-2 text-xs font-semibold">
                    <Link href="/my-plan" className="bg-accent text-black rounded-full px-3 py-1">
                        Plan {plan.length}
                    </Link>
                    <Link href="/my-plan" className="border border-white/30 rounded-full px-3 py-1">
                        Saved {saved.length}
                    </Link>
                </div>
            </div>
        </header>
    )
}