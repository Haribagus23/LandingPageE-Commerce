'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Hero from '@/components/hero'
import ProductHighlights from '@/components/product-highlights'
import FeaturesSection from '@/components/features-section'
import TestimonialsSection from '@/components/testimonials-section'
import Footer from '@/components/footer'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef(null)

  useEffect(() => {
    // Set up scroll animations
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="bg-background min-h-screen text-foreground overflow-hidden">
      <Hero />
      <ProductHighlights />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  )
}
