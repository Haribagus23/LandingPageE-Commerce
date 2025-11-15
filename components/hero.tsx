'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const headlineRef = useRef(null)
  const subheadlineRef = useRef(null)
  const ctaRef = useRef(null)
  const imageRef = useRef(null)
  const gradientRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Animate gradient background
      gsap.to(gradientRef.current, {
        backgroundPosition: '100% 100%',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Staggered entrance animation
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
        .fromTo(
          subheadlineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out' },
          '-=0.4'
        )
        .fromTo(
          imageRef.current,
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.4'
        )

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
        y: -100,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={gradientRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, rgb(23, 7, 40) 0%, rgb(30, 10, 60) 50%, rgb(15, 5, 35) 100%)',
        backgroundSize: '200% 200%',
      }}
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-blue-600 to-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div className="flex flex-col gap-8">
          <h1
            ref={headlineRef}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-white"
          >
            The Future of <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Technology</span>
          </h1>

          <p
            ref={subheadlineRef}
            className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl"
          >
            Experience premium engineering meets cutting-edge innovation. Discover products crafted
            with precision for the modern world.
          </p>

          <button
            ref={ctaRef}
            className="w-fit px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            Explore Products
          </button>
        </div>

        {/* Right image */}
        <div
          ref={imageRef}
          className="relative h-96 sm:h-[500px] lg:h-[600px] flex items-center justify-center"
        >
          <div className="relative w-full h-full">
            {/* Animated frame */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl" />
            <img
              src="/premium-tech-product-display.jpg"
              alt="Premium tech product"
              className="relative w-full h-full object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
