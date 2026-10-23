import { FaArrowDown } from 'react-icons/fa'

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <p className="text-accent text-xs font-semibold tracking-[0.3em] mb-4">WORKOUT LIBRARY</p>
        <h1 className="font-display font-bold uppercase text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
          Train with intent. <span className="text-accent">Log every set.</span>
        </h1>
        <p className="text-muted mt-5 max-w-md">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <a
          href="#library"
          className="inline-flex items-center gap-2 mt-8 bg-accent text-black font-semibold uppercase text-sm px-6 py-3 rounded-md hover:brightness-95 transition"
        >
          Browse Workouts <FaArrowDown />
        </a>
      </div>

      <img
  src="/banner.png"
  alt="FitLog banner"
  className="w-full h-auto"
/>
    </section>
  )
}