"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Marquee } from "@/components/magicui/marquee"
import { ArrowRight, Sparkles, Check, Calendar, Users, Clock, MessageSquare } from "lucide-react"
import { GlowButton } from "./magnetic-button"
import { useReveal } from "@/hooks/useReveal"

const partners = [
  "Oscietra Caviar",
  "Valrhona Chocolate",
  "Miyazaki A5 Wagyu",
  "Tuscan Black Truffles",
  "Brittany Blue Lobster",
  "Dom Pérignon",
  "Carabineros Prawns",
  "Roquefort Société"
]

const testimonials = [
  {
    quote: "L'Étoile Dorée offers the finest French-Italian fusion. The saffron tagliolini with butter-poached lobster is a masterpiece of textures.",
    author: "Sarah Chen",
    role: "Patron since 2018",
    initials: "SC",
    color: "0.75 0.12 75",
  },
  {
    quote: "A true sanctuary of taste. The gold-leaf chocolate soufflé is not just a dessert, it's an interactive performance. The ambiance is unmatched.",
    author: "Marcus Webb",
    role: "Fine Dining Critic",
    initials: "MW",
    color: "0.60 0.15 60",
  },
  {
    quote: "The Sommelier selection paired with the 5-course Chef's Table was flawless. Exceptional service and gorgeous glass-like aesthetics.",
    author: "Priya Kapoor",
    role: "Private Member",
    initials: "PK",
    color: "0.85 0.07 85",
  },
]

export function TrustSection() {
  const [date, setDate] = useState("")
  const [time, setTime] = useState("7:30 PM")
  const [guests, setGuests] = useState("2 Guests")
  const [notes, setNotes] = useState("")
  const [bookingState, setBookingState] = useState<"form" | "loading" | "success">("form")

  const testimonialsReveal = useReveal("-80px")
  const formReveal = useReveal("-50px")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) return
    setBookingState("loading")
    setTimeout(() => {
      setBookingState("success")
    }, 1200)
  }

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  }

  const formVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
  }

  return (
    <section
      id="reserve"
      className="relative py-14 overflow-hidden border-t border-white/[0.04]"
      aria-label="Client testimonials and reservations"
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
        {/* Ingredient Partners marquee */}
        <div className="mb-12">
          <p className="text-center text-[10px] uppercase font-bold tracking-[0.35em] text-white/20 mb-8">
            Sourcing partner ingredients from premium world purveyors
          </p>
          <Marquee className="[--duration:25s] opacity-35 hover:opacity-55 transition-opacity duration-500" pauseOnHover>
            {partners.map((partner, i) => (
              <span
                key={i}
                className="mx-10 text-xs font-bold uppercase tracking-[0.25em] text-gold hover:text-white transition-colors duration-300 cursor-default font-mono"
              >
                ★ {partner}
              </span>
            ))}
          </Marquee>
        </div>

        {/* Testimonials */}
        <motion.div
          ref={testimonialsReveal.ref}
          initial="hidden"
          animate={testimonialsReveal.visible ? "visible" : "hidden"}
          variants={listContainerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative p-8 rounded-3xl bg-white/[0.02] flex flex-col gap-6"
              style={{ border: "1px solid rgba(255,255,255,0.05)" }}
              whileHover={{
                y: -3,
                borderColor: `oklch(${t.color} / 0.25)`,
                boxShadow: `0 20px 60px -15px oklch(${t.color} / 0.15)`,
              }}
            >
              {/* Quotation mark */}
              <div
                className="text-6xl font-serif leading-none -mb-4 opacity-30 select-none"
                style={{ color: `oklch(${t.color})` }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              <p className="text-white/60 text-sm leading-relaxed italic">
                {t.quote}
              </p>

              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/[0.04]">
                <div
                  className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                  style={{ background: `oklch(${t.color} / 0.25)`, color: `oklch(${t.color})` }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-xs font-bold text-white/75">{t.author}</div>
                  <div className="text-[10px] text-white/35 font-mono">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Reservation Card Form */}
        <motion.div
          ref={formReveal.ref}
          initial="hidden"
          animate={formReveal.visible ? "visible" : "hidden"}
          variants={formVariants}
          className="relative overflow-hidden rounded-3xl border border-gold/20 p-8 md:p-12"
          style={{
            background: "linear-gradient(135deg, oklch(0.12 0.02 50) 0%, oklch(0.09 0.01 50) 100%)",
          }}
        >
          {/* Background Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 50%, oklch(0.75 0.12 75 / 0.08) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-[10px] uppercase font-bold tracking-[0.35em] text-gold mb-3 animate-pulse">
                ★ RESERVE A TABLE ★
              </p>
              <h2
                className="font-black uppercase tracking-tighter leading-none mb-4"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  background: "linear-gradient(180deg, white 0%, rgba(255,255,255,0.7) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Experience L'Étoile Dorée
              </h2>
              <p className="text-white/40 text-sm max-w-md mx-auto">
                Secure your dining arrangement below. Table details and details of dress code will be sent to your email.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {bookingState === "form" && (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Left Column: Input Details */}
                  <div className="space-y-4">
                    {/* Date picker */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-[0.15em] text-white/50 mb-1.5 flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-gold" /> Select Date
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-gold/50 transition-colors text-sm"
                      />
                    </div>

                    {/* Time slots */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-[0.15em] text-white/50 mb-1.5 flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-gold" /> Select Hour
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["12:00 PM", "1:30 PM", "6:00 PM", "7:30 PM", "9:00 PM"].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTime(t)}
                            className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                              time === t
                                ? "bg-gold border-gold text-background"
                                : "bg-white/[0.02] border-white/5 text-white/60 hover:border-white/20"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Guest Counts & Notes */}
                  <div className="space-y-4">
                    {/* Guests selection */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-[0.15em] text-white/50 mb-1.5 flex items-center gap-2">
                        <Users className="h-3.5 w-3.5 text-gold" /> Party Size
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {["1 Guest", "2 Guests", "4 Guests", "6 Guests", "8 Guests"].map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setGuests(g)}
                            className={`py-2 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                              guests === g
                                ? "bg-gold border-gold text-background"
                                : "bg-white/[0.02] border-white/5 text-white/60 hover:border-white/20"
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-[0.15em] text-white/50 mb-1.5 flex items-center gap-2">
                        <MessageSquare className="h-3.5 w-3.5 text-gold" /> Dietary notes & requests
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Gluten allergy, window table, anniversary occasion..."
                        rows={2}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors text-xs resize-none"
                      />
                    </div>
                  </div>

                  {/* Booking Action */}
                  <div className="md:col-span-2 mt-4 flex justify-center">
                    <GlowButton
                      variant="primary"
                      size="lg"
                      type="submit"
                      className="uppercase text-xs tracking-widest min-w-56 justify-center"
                    >
                      <span>Complete Reservation</span>
                      <ArrowRight className="h-4 w-4" />
                    </GlowButton>
                  </div>
                </motion.form>
              )}

              {bookingState === "loading" && (
                <motion.div
                  key="loading"
                  className="py-12 flex flex-col items-center justify-center gap-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="h-10 w-10 rounded-full border-2 border-gold/25 border-t-gold animate-spin" />
                  <p className="text-white/40 text-xs font-mono uppercase tracking-[0.15em]">
                    Verifying dining slots...
                  </p>
                </motion.div>
              )}

              {bookingState === "success" && (
                <motion.div
                  key="success"
                  className="py-8 text-center flex flex-col items-center justify-center gap-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="h-12 w-12 rounded-full bg-gold/20 border border-gold flex items-center justify-center text-gold mb-2">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                    Reservation Secured!
                  </h3>
                  <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 max-w-md w-full space-y-2 text-xs text-white/50 text-left">
                    <div className="flex justify-between">
                      <span className="font-mono text-white/30">DATE:</span>
                      <span className="font-semibold text-white/80">{date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono text-white/30">TIME:</span>
                      <span className="font-semibold text-white/80">{time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono text-white/30">PARTY SIZE:</span>
                      <span className="font-semibold text-white/80">{guests}</span>
                    </div>
                    {notes && (
                      <div className="border-t border-white/[0.05] pt-2 mt-2">
                        <span className="font-mono text-white/30 block mb-1">NOTES:</span>
                        <span className="italic text-white/70 block">{notes}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-white/30 tracking-widest uppercase mt-4">
                    A confirmation ticket has been dispatched.
                  </p>
                  <GlowButton
                    variant="outline"
                    size="sm"
                    onClick={() => setBookingState("form")}
                    className="mt-2 uppercase text-[9px] tracking-wider"
                  >
                    Modify details
                  </GlowButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
