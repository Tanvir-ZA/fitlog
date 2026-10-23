
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaCheck, FaTimes, FaArrowRight } from 'react-icons/fa'
import { usePlan } from '@/context/PlanContext'

export default function MyPlan() {
  const {
    plan,
    saved,
    removeFromList,
    markDone,
  } = usePlan()

  const [activeTab, setActiveTab] = useState('plan')

  const workouts = activeTab === 'plan' ? plan : saved

  const totalMinutes = plan.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0
  )

  const totalCalories = plan.reduce(
    (total, workout) => total + Number(workout.caloriesBurned || 0),
    0
  )

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display text-4xl uppercase">My Plan</h1>
      <p className="text-muted mt-2">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="grid grid-cols-3 gap-3 mt-8">
        <div className="bg-card border border-white/10 rounded-xl p-4">
          <p className="text-muted text-xs uppercase">Exercises</p>
          <p className="font-display text-2xl mt-2">{plan.length}</p>
        </div>

        <div className="bg-card border border-white/10 rounded-xl p-4">
          <p className="text-muted text-xs uppercase">Minutes</p>
          <p className="font-display text-2xl mt-2">{totalMinutes}</p>
        </div>

        <div className="bg-card border border-white/10 rounded-xl p-4">
          <p className="text-muted text-xs uppercase">Calories</p>
          <p className="font-display text-2xl mt-2">{totalCalories}</p>
        </div>
      </div>

      <div className="flex gap-6 border-b border-white/10 mt-10 mb-6">
        <button
          onClick={() => setActiveTab('plan')}
          className={`pb-3 text-sm uppercase ${
            activeTab === 'plan'
              ? 'text-accent border-b-2 border-accent'
              : 'text-muted'
          }`}
        >
          Today's Plan ({plan.length})
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 text-sm uppercase ${
            activeTab === 'saved'
              ? 'text-accent border-b-2 border-accent'
              : 'text-muted'
          }`}
        >
          Saved ({saved.length})
        </button>
      </div>

      {workouts.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="font-display text-2xl uppercase">
            Nothing Here Yet
          </h2>
          <p className="text-muted mt-3">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/#library"
            className="inline-flex items-center gap-2 bg-accent text-black font-semibold px-5 py-3 rounded-lg mt-6"
          >
            Go to workouts <FaArrowRight />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-card border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row gap-4 sm:items-center"
            >
              <img
                src={workout.image}
                alt={workout.name}
                className="w-full sm:w-28 h-36 sm:h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="font-display text-xl uppercase">
                  {workout.name}
                </h3>
                <p className="text-muted text-sm mt-1">
                  {workout.equipment}
                </p>
                <p className="text-muted text-xs mt-3">
                  {workout.duration} min · {workout.caloriesBurned} kcal · Rating {workout.rating}
                </p>

                {activeTab === 'plan' && workout.done && (
                  <p className="text-accent text-xs mt-2">Completed</p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/workout/${workout.id}`}
                  className="border border-white/20 px-3 py-2 rounded-lg text-sm"
                >
                  View Details
                </Link>

                {activeTab === 'plan' && !workout.done && (
                  <button
                    onClick={() => markDone(workout.id)}
                    className="bg-accent text-black px-3 py-2 rounded-lg text-sm flex items-center gap-2"
                  >
                    <FaCheck /> Mark as Done
                  </button>
                )}

                <button
                  onClick={() =>
                    removeFromList(activeTab === 'plan' ? 'plan' : 'saved', workout.id)
                  }
                  className="border border-white/20 px-3 py-2 rounded-lg text-sm"
                  aria-label={`Remove ${workout.name}`}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
