export default function Footer() {
  return (
    <footer className="bg-[#0b0d11] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="FitLog logo" className="h-7 w-auto" />
          <span className="font-display text-lg tracking-wide">FITLOG</span>
        </div>
        <p className="text-xs text-muted text-center">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  )
}