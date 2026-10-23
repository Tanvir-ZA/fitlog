import Hero from '@/components/Hero'

export default function Home() {
  return (
    <>
      <Hero />
      <section id="library" className="max-w-6xl mx-auto px-4 py-10 scroll-mt-20">
        <h2 className="font-display text-3xl uppercase">The Library</h2>
        <p className="text-muted mt-1">Twelve lifts covering every major muscle group.</p>
      </section>
    </>
  )
}