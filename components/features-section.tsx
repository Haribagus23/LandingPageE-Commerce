'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Processing speeds that redefine expectations',
  },
  {
    icon: '🔒',
    title: 'Military Security',
    description: 'Enterprise-grade protection built-in',
  },
  {
    icon: '🌍',
    title: 'Global Reach',
    description: 'Connected worldwide, instantly accessible',
  },
  {
    icon: '♻️',
    title: 'Eco-Friendly',
    description: 'Sustainable innovation for the future',
  },
  {
    icon: '🎨',
    title: 'Design Excellence',
    description: 'Aesthetic perfection in every detail',
  },
  {
    icon: '🚀',
    title: 'Future Ready',
    description: 'Always ahead of tomorrow',
  },
]

export default function FeaturesSection() {
  const containerRef = useRef(null)
  const featuresRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      featuresRef.current.forEach((feature, index) => {
        if (!feature) return

        gsap.fromTo(
          feature,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.08,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 60%',
              end: 'top 20%',
              scrub: 1,
            },
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-400">
            Every feature designed to elevate your experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => {
                if (el) featuresRef.current[index] = el
              }}
              className="group p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-900/40 hover:to-pink-900/40"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
