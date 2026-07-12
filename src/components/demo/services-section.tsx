"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Check, Sparkles } from "lucide-react"
import { GlowButton } from "./magnetic-button"
import { BorderBeam } from "@/components/magicui/border-beam"
import { useReveal } from "@/hooks/useReveal"

const tiers = [
  {
    name: "Boutique Breakfast",
    price: "$35",
    period: "/guest",
    tagline: "Perfect for morning meetings & refined bistro starters.",
    features: [
      "Choice of 1 gourmet breakfast dish",
      "Unlimited single-origin coffee or tea",
      "Assortment of oven-fresh pastries",
      "Fresh organic cold-pressed juices",
      "Reserved dining table (up to 1.5 hrs)",
    ],
    cta: "Reserve Breakfast",
    highlighted: false,
    color: "0.60 0.15 60",
    badge: null,
  },
  {
    name: "Chef's Table",
    price: "$120",
    period: "/guest",
    tagline: "Our premium curated degustation experience.",
    features: [
      "5-course curated fusion surprise menu",
      "Exclusive sommelier vintage pairings",
      "Chef-side explanation of plate concepts",
      "Edible gold soufflé dessert included",
      "Priority valet & window parlor seating",
    ],
    cta: "Secure Chef's Table",
    highlighted: true,
    color: "0.75 0.12 75",
    badge: "Signature Experience",
  },
  {
    name: "Private Soirée",
    price: "Custom",
    period: "",
    tagline: "Exquisite full room buyouts for special events.",
    features: [
      "Full venue buyout (up to 45 guests)",
      "Custom designed menu with executive chef",
      "Dedicated sommelier & mixology bar",
      "Ambient acoustics (live harp or jazz)",
      "Curated floral arrangements & styling",
    ],
    cta: "Inquire Booking",
    highlighted: false,
    color: "0.85 0.07 85",
    badge: null,
  },
]

function PricingCard({ tier, variants }: { tier: typeof tiers[0]; variants: any }) {
  const handleScroll = (id: string) => {
    const el = document.querySelector(id)
    el?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.div
      variants={variants}
      className={`relative flex flex-col rounded-3xl p-8 overflow-hidden ${
        tier.highlighted
          ? "bg-gradient-to-b from-amber-950/20 to-amber-900/5"
          : "bg-white/[0.02]"
      }`}
      style={{
        border: `1px solid ${tier.highlighted ? "rgba(212, 175, 55, 0.30)" : "rgba(255,255,255,0.06)"}`,
      }}
      whileHover={{
        y: -4,
        boxShadow: `0 30px 80px -15px oklch(${tier.color} / 0.15)`,
        borderColor: `oklch(${tier.color} / 0.30)`,
      }}
      onClick={() => handleScroll("#reserve")}
    >
      {/* Badge */}
      {tier.badge && (
        <div
          className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
          style={{
            background: `oklch(${tier.color} / 0.20)`,
            border: `1px solid oklch(${tier.color} / 0.40)`,
            color: `oklch(${tier.color})`,
          }}
        >
          <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
          {tier.badge}
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h3 className="text-base font-bold uppercase tracking-wide text-white/80 mb-2">
          {tier.name}
        </h3>
        <p className="text-white/35 text-xs leading-relaxed">{tier.tagline}</p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-8 pb-8 border-b border-white/[0.05]">
        <span
          className="font-black tracking-tighter"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            color: tier.highlighted ? `oklch(${tier.color})` : "white",
          }}
        >
          {tier.price}
        </span>
        {tier.period && (
          <span className="text-white/35 text-sm font-mono">{tier.period}</span>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3.5 mb-10 flex-1" role="list">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-white/55">
            <span
              className="mt-0.5 h-4 w-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: `rgba(255,255,255,0.04)` }}
              aria-hidden="true"
            >
              <Check
                className="h-2.5 w-2.5 animate-pulse"
                style={{ color: `oklch(${tier.color})` }}
              />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <GlowButton
        variant={tier.highlighted ? "primary" : "outline"}
        size="md"
        className="w-full justify-center uppercase text-xs tracking-[0.15em] font-bold"
      >
        {tier.cta}
      </GlowButton>

      {/* Animated border for featured */}
      {tier.highlighted && (
        <BorderBeam
          size={300}
          duration={10}
          colorFrom="oklch(0.75 0.12 75)"
          colorTo="oklch(0.60 0.15 60)"
        />
      )}
    </motion.div>
  )
}

export function ServicesSection() {
  const headerReveal = useReveal("-80px")
  const cardsReveal = useReveal("-50px")

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  }

  return (
    <section
      id="services"
      className="relative py-14 md:py-20 overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, oklch(0.75 0.12 75 / 0.04) 0%, transparent 60%),
            radial-gradient(ellipse at 50% 100%, oklch(0.60 0.15 60 / 0.03) 0%, transparent 60%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Top section line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" aria-hidden="true" />

      <div className="container mx-auto px-6 md:px-8">
        {/* Section header */}
        <motion.div
          ref={headerReveal.ref}
          initial="hidden"
          animate={headerReveal.visible ? "visible" : "hidden"}
          variants={headerVariants}
          className="mb-12 text-center max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" aria-hidden="true" />
            <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-gold whitespace-nowrap">
              03 — Les Services
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" aria-hidden="true" />
          </div>

          <h2
            id="services-heading"
            className="font-black uppercase tracking-tighter leading-none mb-6"
            style={{
              background: "linear-gradient(180deg, oklch(0.97 0.003 50) 0%, oklch(0.75 0.12 75) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Dining Tiers
            <br />
            <span className="font-light italic text-white/40 font-serif">calibrated</span> for taste.
          </h2>

          <p className="text-white/35 text-sm leading-relaxed">
            Three signature dining structures, each crafted with culinary passion, detail, and dedication.
            No compromises. Only excellence.
          </p>
        </motion.div>

        {/* Pricing grid */}
        <motion.div
          ref={cardsReveal.ref}
          initial="hidden"
          animate={cardsReveal.visible ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch"
        >
          {tiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} variants={cardVariants} />
          ))}
        </motion.div>

        {/* Trust row */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <p className="text-white/25 text-xs font-mono uppercase tracking-[0.2em]">
            All guest menus include sparkling spring water · 24h cancellation notice required · Special dietary needs accommodated
          </p>
        </motion.div>
      </div>
    </section>
  )
}
