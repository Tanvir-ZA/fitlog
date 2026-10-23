
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  FaArrowLeft,
  FaPlus,
  FaBookmark,
} from 'react-icons/fa'
import { usePlan } from '@/context/PlanContext'
import Spinner from '@/components/Spinner'

const API = 'https://api.abcz.workers.dev/api/fitlog'
const ALT_API = 'https://api.api-store.workers.dev/api/fitlog'

export default function WorkoutDetails() {
  const { id } = useParams()
  const { addToPlan, addToSaved } = usePlan()

  const [workout, setWorkout] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function getWorkout() {
      try {
        let response = await fetch(`${API}/${id}`)

        if (!response.ok) {
          response = await fetch(`${ALT_API}/${id}`)
        }

        if (!response.ok) {
          throw new Error('Workout not found')
        }

        const data = await response.json()
        setWorkout(data.workout || data)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (id) getWorkout()
  }, [id])

  if (loading) return <Spinner />

  if (error || !workout || !workout.id) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="font-display text-3xl uppercase">
          Workout not found
        </h1>
        <Link href="/" className="text-accent inline-block mt-5">
          Back to workouts
        </Link>
      </section>
    )
  }

  const instructions = Array.isArray(workout.instructions)
    ? workout.instructions
    : []

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <Link
        href="/#library"
        className="inline-flex items-center gap-2 text-muted hover:text-accent mb-8"
      >
        <FaArrowLeft /> Back to library
      </Link>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full h-72 md:h-[520px] object-cover rounded-xl bg-card"
          />
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {(workout.muscleGroups || []).map((group) => (
              <span
                key={group}
                className="bg-accent/15 text-accent text-xs uppercase px-3 py-1 rounded"
              >
                {group}
              </span>
            ))}
          </div>

          <h1 className="font-display text-3xl md:text-5xl uppercase">
            {workout.name}
          </h1>

          <p className="text-muted leading-7 mt-4">
            {workout.description}
          </p>

          <div className="bg-card border border-white/10 rounded-xl p-5 mt-7">
            <h2 className="font-display text-xl uppercase mb-4">
              Key Specs
            </h2>

            <div className="space-y-3 text-sm">
              {[
                ['Equipment', workout.equipment],
                ['Difficulty', workout.difficulty],
                ['Sets', workout.sets],
                ['Reps', workout.reps],
                ['Duration', workout.duration ? `${workout.duration} min` : null],
                ['Calories', workout.caloriesBurned ? `${workout.caloriesBurned} kcal` : null],
                ['Rating', workout.rating],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 border-b border-white/10 pb-2"
                >
                  <span className="text-muted uppercase">{label}</span>
                  <span className="text-right">{value ?? '—'}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7">
            <h2 className="font-display text-xl uppercase mb-4">
              Instructions
            </h2>

            {instructions.length > 0 ? (
              <ol className="space-y-3">
                {instructions.slice(0, 4).map((step, index) => (
                  <li key={index} className="flex gap-3 text-sm leading-6">
                    <span className="text-accent font-bold">{index + 1}.</span>
                    <span>{typeof step === 'string' ? step : step.text}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-muted text-sm">
                Instructions are not available for this workout.
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={() => addToPlan(workout)}
              className="flex items-center justify-center gap-2 bg-accent text-black font-semibold px-5 py-3 rounded-lg"
            >
              <FaPlus /> Add to today's plan
            </button>

            <button
              onClick={() => addToSaved(workout)}
              className="flex items-center justify-center gap-2 border border-white/20 px-5 py-3 rounded-lg hover:border-accent"
            >
              <FaBookmark /> Save for later
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
