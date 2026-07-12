"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useReveal } from "@/hooks/useReveal"

const works = [
  {
    id: "01",
    title: "Le Homard Céleste",
    category: "Chef's Signature Dish",
    year: "25 min",
    tags: ["Blue Lobster", "Saffron Tagliolini", "Oscietra Caviar"],
    description:
      "Butter-poached blue lobster tail served over saffron black squid ink pasta, drizzled with a delicate champagne emulsion and topped with caviar.",
    gradient: "from-gold/30 via-caramel/20 to-transparent",
    accentColor: "0.75 0.12 75",
    size: "large",
    stat: "$68",
    statSub: "Rating: 4.9",
  },
  {
    id: "02",
    title: "Croissant Perdu",
    category: "Boutique Breakfast",
    year: "12 min",
    tags: ["Brioche Croissant", "Vanilla Custard", "Lavender Honey"],
    description:
      "House-baked croissant lost in bean vanilla custard, toasted golden, served with organic fresh berries.",
    gradient: "from-caramel/25 via-gold/15 to-transparent",
    accentColor: "0.60 0.15 60",
    size: "small",
    stat: "$18",
    statSub: "Rating: 4.9",
  },
  {
    id: "03",
    title: "Gold Macchiato",
    category: "Bistro & Cafe",
    year: "5 min",
    tags: ["Single Origin", "Steamed Oat Milk", "Edible Gold Dust"],
    description:
      "Double ristretto espresso, house salted caramel, organic milk, finished with gold dust flakes.",
    gradient: "from-amber-900/25 via-orange-900/15 to-transparent",
    accentColor: "0.70 0.18 55",
    size: "small",
    stat: "$12",
    statSub: "Rating: 4.9",
  },
  {
    id: "04",
    title: "A5 Wagyu Ribeye",
    category: "Exquisite Main",
    year: "20 min",
    tags: ["A5 Miyazaki Wagyu", "Truffle Potato Purée", "Bone-Marrow Jus"],
    description:
      "A5 Wagyu ribeye seared rare, accompanied by organic truffle mash, glazed baby root vegetables, and bone-marrow glaze.",
    gradient: "from-gold/30 via-caramel/20 to-transparent",
    accentColor: "0.75 0.12 75",
    size: "large",
    stat: "$85",
    statSub: "Rating: 5.0",
  },
]

function WorkCard({ work, variants }: { work: typeof works[0]; variants: any }) {
  const handleScroll = (id: string) => {
    const el = document.querySelector(id)
    el?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.div
      variants={variants}
      className="group relative overflow-hidden rounded-3xl cursor-pointer"
      style={{
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      whileHover={{
        borderColor: `oklch(${work.accentColor} / 0.3)`,
        boxShadow: `0 20px 60px -10px oklch(${work.accentColor} / 0.25), 0 0 0 1px oklch(${work.accentColor} / 0.1)`,
      }}
      onClick={() => handleScroll("#reserve")}
      transition={{ duration: 0.35 }}
      data-cursor="hover"
      data-cursor-label="Book"
      tabIndex={0}
      role="article"
      aria-label={`${work.title} — ${work.category}`}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${work.gradient} opacity-80`} aria-hidden="true" />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px at 50% 50%, oklch(${work.accentColor} / 0.1), transparent)`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 p-8 md:p-10 h-full flex flex-col min-h-[320px]">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em]"
                style={{ color: `oklch(${work.accentColor})` }}>
                {work.id}
              </span>
              <span className="text-white/20 text-[10px]">—</span>
              <span className="text-white/35 text-[9px] font-mono uppercase tracking-wider">{work.year}</span>
            </div>
            <div className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-medium">{work.category}</div>
          </div>

          {/* Stat badge */}
          <div
            className="text-right border rounded-lg px-3 py-2 backdrop-blur-sm"
            style={{ borderColor: `oklch(${work.accentColor} / 0.25)`, background: `oklch(${work.accentColor} / 0.08)` }}
          >
            <div className="font-black text-sm" style={{ color: `oklch(${work.accentColor})` }}>{work.stat}</div>
            <div className="text-white/30 text-[9px] uppercase tracking-wider">{work.statSub}</div>
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-black uppercase tracking-tighter leading-none mb-5"
          style={{
            fontSize: work.size === "large" ? "clamp(2rem, 5vw, 3.5rem)" : "clamp(1.5rem, 3vw, 2.25rem)",
            background: "linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.7) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {work.title}
        </h3>

        {/* Description */}
        <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-sm">
          {work.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border"
              style={{
                color: `oklch(${work.accentColor} / 0.8)`,
                borderColor: `oklch(${work.accentColor} / 0.2)`,
                background: `oklch(${work.accentColor} / 0.08)`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto flex items-center gap-2 group/link">
          <span
            className="text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-200"
            style={{ color: `oklch(${work.accentColor} / 0.66)` }}
          >
            Order & Reserve Table
          </span>
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            style={{ color: `oklch(${work.accentColor})` }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Border beam effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
        style={{
          background: `linear-gradient(135deg, oklch(${work.accentColor} / 0.2) 0%, transparent 50%)`,
          maskImage: "linear-gradient(black, black)",
          WebkitMaskImage: "linear-gradient(black, black)",
          padding: "1px",
        }}
        aria-hidden="true"
      />
    </motion.div>
  )
}

export function WorksSection() {
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
      transition: { staggerChildren: 0.12 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  }

  return (
    <section
      id="menu"
      className="relative py-14 md:py-20 overflow-hidden"
      aria-labelledby="works-heading"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 100% 30%, oklch(0.75 0.12 75 / 0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 0% 70%, oklch(0.60 0.15 60 / 0.03) 0%, transparent 50%)
          `,
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 md:px-8">
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
              02 — Le Menu d'Or
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent max-w-xs" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <h2
              id="works-heading"
              className="font-black uppercase tracking-tighter leading-none"
              style={{
                background: "linear-gradient(180deg, oklch(0.97 0.003 50) 0%, oklch(0.75 0.12 75) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Discover
              <br />
              <span className="font-light italic text-white/50 font-serif">signature</span> creations.
            </h2>

            <p className="text-white/35 text-sm leading-relaxed max-w-sm lg:ml-auto lg:text-right">
              Each dish represents a unique design challenge solved with culinary precision, rustic warmth, and creative courage.
            </p>
          </div>
        </motion.div>

        {/* Works grid — asymmetric bento layout */}
        <motion.div
          ref={cardsReveal.ref}
          initial="hidden"
          animate={cardsReveal.visible ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {works.map((work) => (
            <WorkCard key={work.id} work={work} variants={cardVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
