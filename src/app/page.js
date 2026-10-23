'use client'
import { useEffect, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import Hero from '@/components/Hero'
import WorkoutCard from '@/components/WorkoutCard'
import Spinner from '@/components/Spinner'

const API = 'https://api.abcz.workers.dev/api/fitlog'
const ALT_API = 'https://api.api-store.workers.dev/api/fitlog'

const sortKeys = {
  Duration: 'duration',
  Calories: 'caloriesBurned',
  Rating: 'rating',
}

export default function Home() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sortBy, setSortBy] = useState('Duration')

  useEffect(() => {
    async function getData() {
      try {
        let res = await fetch(API)
        if (!res.ok) res = await fetch(ALT_API) // backup API
        const data = await res.json()
        setWorkouts(data)
      } catch {
        setError('Could not load workouts. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])

  // sort a copy of the list: duration small to big, calories and rating big to small
  const sorted = [...workouts].sort((a, b) => {
    const key = sortKeys[sortBy]
    return sortBy === 'Duration' ? a[key] - b[key] : b[key] - a[key]
  })

  return (
    <>
      <Hero />

      <section id="library" className="max-w-6xl mx-auto px-4 py-10 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl uppercase">The Library</h2>
            <p className="text-muted mt-1">Twelve lifts covering every major muscle group.</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted">Sort By</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-card border border-white/15 rounded-md pl-3 pr-9 py-2 text-sm cursor-pointer"
              >
                <option>Duration</option>
                <option>Calories</option>
                <option>Rating</option>
              </select>
              <FaChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                size={12}
              />
            </div>
          </div>
        </div>

        {loading && <Spinner />}
        {error && <p className="text-red-400 text-center py-10">{error}</p>}

        {!loading && !error && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}