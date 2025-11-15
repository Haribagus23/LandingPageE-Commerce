'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    id: 1,
    title: 'ProMax Device',
    description: 'Ultimate performance and design',
    image: '/pro-tech-device-elegant.jpg',
    price: '$2,999',
  },
  {
    id: 2,
    title: 'UltraSync Pro',
    description: 'Seamless ecosystem integration',
    image: '/wireless-tech-accessory.jpg',
    price: '$1,299',
  },
  {
    id: 3,
    title: 'QuantumChip',
    description: 'Next-gen processing power',
    image: '/advanced-processor-tech.jpg',
    price: '$3,499',
  },
  {
    id: 4,
    title: 'NeoVision',
    description: 'Crystal-clear immersion',
    image: '/premium-display-screen.jpg',
    price: '$1,899',
  },
  {
    id: 5,
    title: 'VortexMax',
    description: 'Speed beyond limits',
    image: '/high-performance-device.jpg',
    price: '$2,499',
  },
  {
    id: 6,
    title: 'ZenCore',
    description: 'Efficiency perfected',
    image: '/sleek-tech-product.jpg',
    price: '$899',
  },
]

export default function ProductHighlights() {
  const containerRef = useRef(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return

        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 20%',
              scrub: false,
              markers: false,
            },
          }
        )

        // Hover animation
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            boxShadow: '0 20px 60px rgba(168, 85, 247, 0.4)',
            duration: 0.3,
            overwrite: 'auto',
          })

          const img = card.querySelector('img')
          if (img) {
            gsap.to(img, { scale: 1.05, duration: 0.3, overwrite: 'auto' })
          }
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            duration: 0.3,
            overwrite: 'auto',
          })

          const img = card.querySelector('img')
          if (img) {
            gsap.to(img, { scale: 1, duration: 0.3, overwrite: 'auto' })
          }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Premium Collection
          </h2>
          <p className="text-lg text-gray-400">
            Handpicked products engineered for excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={el => {
                if (el) cardsRef.current[index] = el
              }}
              className="group relative bg-card rounded-2xl overflow-hidden border border-gray-800 cursor-pointer transition-all duration-300"
            >
              {/* Card background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Image container */}
              <div className="relative h-64 overflow-hidden bg-gray-900">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{product.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {product.price}
                  </span>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
