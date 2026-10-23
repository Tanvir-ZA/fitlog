export default function Spinner({ text = 'Loading workouts…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className="w-10 h-10 border-4 border-white/20 border-t-accent rounded-full animate-spin" />
      <p className="text-muted text-sm">{text}</p>
    </div>
  )
}