"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { GlassCard } from "./glass-card"
import { AnimatedCounter } from "./animated-counter"
import { Flame, Star, Coffee, UtensilsCrossed, Wine, Sparkles } from "lucide-react"
import { useReveal } from "@/hooks/useReveal"

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
  const headerReveal = useReveal("-80px")
  const statsReveal = useReveal("-60px")
  const cardsReveal = useReveal("-40px")

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  }

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }

  const statItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
  }

  const cardItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  }

  return (
    <section
      id="story"
      className="relative py-12 sm:py-14 md:py-20 overflow-hidden"
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

      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          ref={headerReveal.ref}
          initial="hidden"
          animate={headerReveal.visible ? "visible" : "hidden"}
          variants={headerVariants}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-gold">
              01 — L'Histoire
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent max-w-xs origin-left" />
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
        </motion.div>

        {/* Achievement numbers */}
        <motion.div
          ref={statsReveal.ref}
          initial="hidden"
          animate={statsReveal.visible ? "visible" : "hidden"}
          variants={listContainerVariants}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8"
        >
          {achievements.map((item, i) => (
            <motion.div
              key={i}
              variants={statItemVariants}
              className="text-center p-4 sm:p-6 rounded-2xl border border-white/[0.04] bg-white/[0.02]"
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
                {statsReveal.visible ? (
                  <AnimatedCounter end={item.value} suffix={item.suffix} duration={1800} />
                ) : (
                  <span>0</span>
                )}
              </div>
              <div className="text-white/35 text-xs font-medium uppercase tracking-[0.2em]">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Capability cards grid */}
        <motion.div
          ref={cardsReveal.ref}
          initial="hidden"
          animate={cardsReveal.visible ? "visible" : "hidden"}
          variants={listContainerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {capabilities.map((cap, i) => {
            const Icon = cap.icon
            return (
              <motion.div
                key={i}
                variants={cardItemVariants}
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
        </motion.div>
      </div>
    </section>
  )
}
