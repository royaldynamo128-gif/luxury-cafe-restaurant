"use client"

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import gsap from "gsap"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { GlowButton } from "./magnetic-button"

const HeroCanvas = dynamic(
  () => import("./hero-canvas").then((m) => m.HeroCanvas),
  { ssr: false }
)

import { ErrorBoundary } from "./error-boundary"

const AuroraBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    {/* Static ambient light — top-left gold */}
    <div
      className="absolute rounded-full"
      style={{
        width: "60%",
        height: "60%",
        top: "-15%",
        left: "-5%",
        background: "radial-gradient(ellipse, oklch(0.75 0.12 75 / 0.12) 0%, transparent 70%)",
        filter: "blur(80px)",
      }}
    />
    {/* Static ambient light — bottom-right caramel */}
    <div
      className="absolute rounded-full"
      style={{
        width: "50%",
        height: "50%",
        bottom: "-10%",
        right: "-5%",
        background: "radial-gradient(ellipse, oklch(0.60 0.15 60 / 0.10) 0%, transparent 70%)",
        filter: "blur(80px)",
      }}
    />
  </div>
)

export function HeroSection() {
  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      gsap.set([badgeRef.current, headlineRef.current, subRef.current, ctaRef.current, statsRef.current], {
        opacity: 1,
        y: 0,
        scale: 1,
      })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" },
          "-=0.4"
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          statsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        )
    })

    return () => ctx.revert()
  }, [])

  const stats = [
    { value: "1 Star", label: "Michelin Guide" },
    { value: "100%", label: "Organic Sourced" },
    { value: "3 Courses", label: "Curated Menus" },
    { value: "12 Slots", label: "Daily Bookings" },
  ]

  const handleScroll = (id: string) => {
    const el = document.querySelector(id)
    el?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background layers */}
      <AuroraBackground />
      <ErrorBoundary>
        <HeroCanvas />
      </ErrorBoundary>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 30%, oklch(0.08 0.005 50) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-8 text-center pt-24 pb-8">

        {/* Badge */}
        <div ref={badgeRef} className="opacity-0 flex justify-center mb-6">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-semibold uppercase tracking-[0.2em] text-gold border border-white/10 hover:border-gold/40 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Sparkles className="h-3 w-3 text-gold" />
            <span>Now accepting dinner reservations</span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold opacity-80" />
          </motion.div>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="opacity-0 text-center max-w-6xl mx-auto"
        >
          <span
            className="block font-black uppercase tracking-tighter leading-[0.9] mb-2"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 9rem)",
              background: "linear-gradient(180deg, oklch(0.97 0.003 50) 0%, oklch(0.75 0.12 75) 60%, oklch(0.60 0.15 60) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Gastronomy
          </span>
          <span
            className="block font-light italic tracking-tight leading-[1] font-serif"
            style={{
              fontSize: "clamp(3rem, 7.5vw, 7.5rem)",
              background: "linear-gradient(135deg, oklch(0.75 0.12 75), oklch(0.60 0.15 60), oklch(0.85 0.07 85))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            elevated
          </span>
          <span
            className="block font-black uppercase tracking-tighter leading-[0.9] mt-2"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 9rem)",
              background: "linear-gradient(180deg, oklch(0.97 0.003 50) 0%, oklch(0.85 0.07 85) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Atmosphere.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="opacity-0 mt-6 text-white/50 font-light leading-relaxed max-w-2xl mx-auto"
          style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
        >
          Bespoke French precision, warm Italian hospitality, and organic seasonal ingredients.
          <br className="hidden md:block" />
          Crafted in Paris for palates that demand the extraordinary.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <GlowButton
            variant="primary"
            size="lg"
            onClick={() => handleScroll("#reserve")}
            className="min-w-48 tracking-widest uppercase text-xs"
          >
            <span>Book a Table</span>
            <ArrowRight className="h-4 w-4" />
          </GlowButton>
          <GlowButton
            variant="outline"
            size="lg"
            onClick={() => handleScroll("#menu")}
            className="min-w-48 tracking-widest uppercase text-xs"
          >
            <span>Explore Menu</span>
          </GlowButton>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="opacity-0 mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto border-t border-white/[0.04] pt-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1, duration: 0.6 }}
            >
              <div
                className="font-black uppercase tracking-tight mb-1 stat-number"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  background: "linear-gradient(135deg, oklch(0.75 0.12 75), oklch(0.60 0.15 60))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.value}
              </div>
              <div className="text-white/35 text-xs font-medium uppercase tracking-[0.15em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <span className="text-[9px] uppercase tracking-[0.25em] text-white/40">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to top, oklch(0.08 0.005 50), transparent)",
        }}
        aria-hidden="true"
      />
    </section>
  )
}
