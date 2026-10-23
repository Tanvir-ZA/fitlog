'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const PlanContext = createContext()
export const usePlan = () => useContext(PlanContext)

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([])
  const [saved, setSaved] = useState([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      setPlan(JSON.parse(localStorage.getItem('fitlog-plan')) || [])
      setSaved(JSON.parse(localStorage.getItem('fitlog-saved')) || [])
    } catch {}
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) localStorage.setItem('fitlog-plan', JSON.stringify(plan))
  }, [plan, ready])

  useEffect(() => {
    if (ready) localStorage.setItem('fitlog-saved', JSON.stringify(saved))
  }, [saved, ready])

  const addToPlan = (w) => {
    if (plan.some((p) => p.id === w.id)) return toast.error("Already in today's plan")
    if (plan.length >= 5) return toast.error('Plan is full (max 5 lifts)')
    setPlan([...plan, { ...w, done: false }])
    toast.success("Added to today's plan")
  }

  const addToSaved = (w) => {
    if (saved.some((s) => s.id === w.id)) return toast.error('Already saved')
    setSaved([...saved, w])
    toast.success('Saved for later')
  }

  const removeFromList = (type, id) => {
    if (type === 'plan') setPlan(plan.filter((p) => p.id !== id))
    else setSaved(saved.filter((s) => s.id !== id))
    toast('Workout removed')
  }

  const markDone = (id) => {
    setPlan(plan.map((p) => (p.id === id ? { ...p, done: true } : p)))
    toast.success('Marked as done')
  }

  return (
    <PlanContext.Provider value={{ plan, saved, addToPlan, addToSaved, removeFromList, markDone }}>
      {children}
    </PlanContext.Provider>
  )
}