'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Tech Innovator',
    content: 'Absolutely revolutionary. The engineering is flawless and performance exceeds all expectations.',
    avatar: '👩‍💼',
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Product Director',
    content: 'This is what premium technology should be. Every detail has been thoughtfully crafted.',
    avatar: '👨‍💼',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Design Lead',
    content: 'The attention to detail is incredible. Both form and function are perfectly balanced.',
    avatar: '👩‍🎨',
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const cardRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
    }
  }, [current])

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Trusted by Leaders
          </h2>
          <p className="text-lg text-gray-400">
            Hear from those who've experienced the difference
          </p>
        </div>

        {/* Testimonial carousel */}
        <div className="relative">
          <div
            ref={cardRef}
            className="p-12 rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 text-center"
          >
            <p className="text-xl text-gray-300 mb-8 italic">
              "{testimonials[current].content}"
            </p>
            <div className="flex flex-col items-center gap-4">
              <div className="text-5xl">{testimonials[current].avatar}</div>
              <div>
                <p className="font-semibold text-white">{testimonials[current].name}</p>
                <p className="text-sm text-gray-400">{testimonials[current].role}</p>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current ? 'w-8 bg-purple-500' : 'w-2 bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
