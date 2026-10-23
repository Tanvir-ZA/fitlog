import Link from 'next/link'
import { FaRegClock, FaFire, FaStar } from 'react-icons/fa'

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="block bg-card border border-white/10 rounded-xl overflow-hidden hover:border-accent/60 transition"
    >
      <img src={workout.image} alt={workout.name} className="w-full h-48 object-cover" />

      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {workout.muscleGroups.map((g) => (
            <span
              key={g}
              className="text-[11px] font-semibold uppercase tracking-wide bg-accent/15 text-accent px-2 py-0.5 rounded"
            >
              {g}
            </span>
          ))}
        </div>

        <h3 className="font-display text-xl uppercase leading-tight">{workout.name}</h3>
        <p className="text-muted text-sm mt-1">{workout.equipment}</p>

        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/10 text-xs text-muted">
          <span className="flex items-center gap-1"><FaRegClock /> {workout.duration} min</span>
          <span className="flex items-center gap-1"><FaFire /> {workout.caloriesBurned} kcal</span>
          <span className="flex items-center gap-1"><FaStar className="text-accent" /> {workout.rating}</span>
        </div>
      </div>
    </Link>
  )
}