"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "What is the dress code at L'Étoile Dorée?",
    answer:
      "We recommend smart casual or semi-formal attire to match our upscale dining atmosphere. We request guests refrain from wearing athletic sportswear, beachwear, or slippers during dinner service.",
  },
  {
    question: "How far in advance should I make a reservation?",
    answer:
      "Reservations open 30 days in advance. For weekends and our signature Chef's Table experiences, we highly recommend booking at least 2 weeks ahead to secure your preferred dining slot.",
  },
  {
    question: "Can you accommodate food allergies or vegan diets?",
    answer:
      "Absolutely. Our executive chef can adapt courses for gluten-free, lactose-free, vegetarian, vegan, and nut allergies. Please note any dietary needs in your reservation details.",
  },
  {
    question: "Is valet parking available?",
    answer:
      "Yes, complimentary secure valet parking is provided for all lunch and dinner guests at our front entrance on Rue du Faubourg Saint-Honoré.",
  },
  {
    question: "What is your reservation cancellation policy?",
    answer:
      "We require at least 24 hours notice for cancellations or modifications. No-shows or late cancellations may incur a fee of $25 per guest to account for ingredients pre-sourced for the reservation.",
  },
]

function FaqItem({ item, index }: { item: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="border-b border-white/[0.05] overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        className="w-full flex items-start justify-between gap-6 py-6 text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        data-cursor="hover"
      >
        <span className="text-sm md:text-base font-semibold text-white/80 group-hover:text-white transition-colors duration-200 leading-relaxed">
          {item.question}
        </span>

        <motion.div
          className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mt-0.5 transition-colors duration-200"
          style={{
            border: `1px solid ${isOpen ? "rgba(212, 175, 55, 0.5)" : "rgba(255,255,255,0.1)"}`,
          }}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          aria-hidden="true"
        >
          <Plus className="h-3.5 w-3.5 text-white/50" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="pb-6 text-sm text-white/40 leading-relaxed max-w-2xl">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FaqSectionNew() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-16 md:py-24"
      aria-labelledby="faq-heading"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, oklch(0.75 0.12 75 / 0.03) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left column */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-gold">
                04 — Insights
              </span>
            </div>

            <h2
              id="faq-heading"
              className="font-black uppercase tracking-tighter leading-none mb-6"
              style={{
                background: "linear-gradient(180deg, oklch(0.97 0.003 50) 0%, oklch(0.75 0.12 75) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Frequently
              <br />
              <span className="font-light italic text-white/40 font-serif">asked</span> things.
            </h2>

            <p className="text-white/35 text-sm leading-relaxed">
              Common inquiries regarding reservations, rules of dining, valet services, and food preparation rules.
            </p>
          </motion.div>

          {/* Right column — FAQ items */}
          <div className="lg:col-span-3" role="list" aria-label="Frequently asked questions">
            {faqs.map((faq, i) => (
              <div key={i} role="listitem">
                <FaqItem item={faq} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
