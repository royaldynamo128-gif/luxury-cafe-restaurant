"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { GlassCard } from "./glass-card"
import { AnimatedCounter } from "./animated-counter"
import { Flame, Star, Coffee, UtensilsCrossed, Wine, Sparkles } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const capabilities = [
  {
    icon: UtensilsCrossed,
    title: "French Gastronomy",
    description:
      "Meticulous culinary techniques, slow bone-marrow reductions, and delicate champagne emulsions crafted to order.",
    accent: "from-gold/10 to-caramel/5",
    iconColor: "text-gold",
    iconBg: "bg-gold/10 border-gold/20",
    delay: 0,
  },
  {
    icon: Flame,
    title: "Italian Soul",
    description:
      "Warm hospitality, fresh hand-rolled squid ink pasta, and rustic herbal aromas reminiscent of Tuscan kitchens.",
    accent: "from-caramel/10 to-gold/5",
    iconColor: "text-caramel",
    iconBg: "bg-caramel/10 border-caramel/20",
    delay: 0.1,
  },
  {
    icon: Sparkles,
    title: "Artisan Sourcing",
    description:
      "Miyazaki Wagyu, fresh Brittany blue lobsters, and summer black truffles flown in from organic artisan farms.",
    accent: "from-gold/10 to-white/5",
    iconColor: "text-gold",
    iconBg: "bg-gold/10 border-gold/20",
    delay: 0.2,
  },
  {
    icon: Coffee,
    title: "Specialty Roastery",
    description:
      "Single-origin micro-lot coffee beans, signature caramel gold macchiatos, and pristine milk latte art.",
    accent: "from-caramel/10 to-gold/5",
    iconColor: "text-caramel",
    iconBg: "bg-caramel/10 border-caramel/20",
    delay: 0.1,
  },
  {
    icon: Star,
    title: "Edible Gold Pastry",
    description:
      "Warm chocolate soufflés featuring 72% Valrhona cocoa, molten centers, and delicate layers of 24k gold leaf.",
    accent: "from-gold/10 to-caramel/5",
    iconColor: "text-gold",
    iconBg: "bg-gold/10 border-gold/20",
    delay: 0.2,
  },
  {
    icon: Wine,
    title: "Sommelier Cellars",
    description:
      "Rare vintages, natural biodynamic grapes, and hand-selected champagnes paired elegantly for every plate.",
    accent: "from-caramel/10 to-white/5",
    iconColor: "text-caramel",
    iconBg: "bg-caramel/10 border-caramel/20",
    delay: 0.3,
  },
]

const achievements = [
  { value: 2015, suffix: "", label: "Year Founded" },
  { value: 1, suffix: "★", label: "Michelin Guide" },
  { value: 100, suffix: "%", label: "Organic Sourced", decimals: 0 },
  { value: 25, suffix: "m", label: "Prep Time Limit" },
]

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      gsap.set(headerRef.current, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      // Animate section header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      )

      // Animate expand line
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 90%",
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative py-14 md:py-20 overflow-hidden"
      aria-labelledby="capabilities-heading"
    >
      {/* Background mesh */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: `
            radial-gradient(ellipse at 0% 50%, oklch(0.75 0.12 75 / 0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 100% 50%, oklch(0.60 0.15 60 / 0.03) 0%, transparent 50%)
          `,
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="opacity-0 mb-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-gold">
              01 — L'Histoire
            </span>
            <div ref={lineRef} className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent max-w-xs origin-left" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <h2
              id="capabilities-heading"
              className="font-black uppercase tracking-tighter leading-none"
              style={{
                background: "linear-gradient(180deg, oklch(0.97 0.003 50) 0%, oklch(0.75 0.12 75) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Classic precision,
              <br />
              <span className="font-light italic text-white/50 font-serif">infused</span> with
              <br />
              warmth.
            </h2>

            <div className="lg:text-right">
              <p className="text-white/40 text-sm leading-relaxed max-w-sm lg:ml-auto">
                Six culinary dimensions, unified by a single objective: serving gastronomy elevated and atmosphere perfected.
              </p>
            </div>
          </div>
        </div>

        {/* Achievement numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {achievements.map((item, i) => (
            <motion.div
              key={i}
              className="text-center p-6 rounded-2xl border border-white/[0.04] bg-white/[0.02]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="font-black stat-number mb-1"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  background: "linear-gradient(135deg, oklch(0.75 0.12 75), oklch(0.60 0.15 60))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <AnimatedCounter end={item.value} suffix={item.suffix} duration={1800} />
              </div>
              <div className="text-white/35 text-xs font-medium uppercase tracking-[0.2em]">{item.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Capability cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: cap.delay,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <GlassCard
                  className={`h-full bg-gradient-to-br ${cap.accent} p-8`}
                  glowColor={`oklch(0.75 0.12 75)`}
                  tiltStrength={6}
                >
                  {/* Icon */}
                  <div className={`p-3 rounded-xl border inline-flex mb-6 ${cap.iconBg}`}>
                    <Icon className={`h-5 w-5 ${cap.iconColor}`} aria-hidden="true" />
                  </div>

                  {/* Content */}
                  <h3 className="text-base font-bold mb-3 tracking-tight text-white">
                    {cap.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed">{cap.description}</p>

                  {/* Bottom accent line */}
                  <div
                    className="mt-6 h-px w-full"
                    style={{
                      background: "linear-gradient(90deg, oklch(0.75 0.12 75 / 0.3), transparent)",
                    }}
                  />
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
