"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu, X } from "lucide-react"
import { GlowButton } from "./magnetic-button"

const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Story", href: "#story" },
  { label: "Services", href: "#services" },
  { label: "FAQ", href: "#faq" },
  { label: "Reserve", href: "#reserve" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const headerRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 40)
  })

  // Highlight active nav section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.2, rootMargin: "-80px 0px -40% 0px" }
    )

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = useCallback((href: string) => {
    setIsMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          isScrolled
            ? "bg-[#0f0e0d]/90 border-white/5 backdrop-blur-md"
            : "bg-transparent border-transparent"
        }`}
      >
        <nav className="container mx-auto px-6 md:px-8" aria-label="Primary navigation">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg"
              aria-label="L'Étoile Dorée — Go to homepage"
            >
              {/* Logo mark */}
              <div
                className="relative h-7 w-7 rounded-lg flex items-center justify-center overflow-hidden"
                style={{ background: "linear-gradient(135deg, oklch(0.75 0.12 75), oklch(0.60 0.15 60))" }}
                aria-hidden="true"
              >
                <div className="absolute inset-0 opacity-30"
                  style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent)" }}
                />
                <span className="relative text-background font-black text-xs">★</span>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="font-serif font-black text-sm tracking-[0.1em] text-white">
                  L'Étoile
                </span>
                <span className="text-gold text-[10px] font-black tracking-[0.15em] uppercase">
                  Dorée
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-1" role="list">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] rounded-lg transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                        isActive ? "text-gold" : "text-white/40 hover:text-white/70"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-lg bg-white/[0.04]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative">{link.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <GlowButton
                variant="primary"
                size="sm"
                onClick={() => handleNavClick("#reserve")}
                className="hidden md:flex uppercase text-[10px] tracking-widest"
              >
                Reserve Table
              </GlowButton>

              {/* Mobile menu button */}
              <button
                className="md:hidden h-11 w-11 rounded-xl border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-expanded={isMobileOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              >
                <AnimatedIcon isOpen={isMobileOpen} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <motion.div
        id="mobile-menu"
        className="fixed inset-0 z-40 md:hidden"
        initial={false}
        animate={{ opacity: isMobileOpen ? 1 : 0, pointerEvents: isMobileOpen ? "auto" : "none" }}
        transition={{ duration: 0.2 }}
        aria-hidden={!isMobileOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setIsMobileOpen(false)}
        />

        {/* Menu panel */}
        <motion.nav
          className="absolute top-0 right-0 bottom-0 w-[min(18rem,100vw)] border-l border-white/[0.06]"
          style={{ background: "oklch(0.09 0.006 50)" }}
          initial={{ x: "100%" }}
          animate={{ x: isMobileOpen ? "0%" : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col h-full p-6 sm:p-8 pt-20 sm:pt-24">
            <ul className="space-y-2 flex-1" role="list">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: isMobileOpen ? 1 : 0, x: isMobileOpen ? 0 : 20 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.4 }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left px-4 py-4 rounded-xl text-sm font-semibold uppercase tracking-wider text-white/50 hover:text-white hover:bg-white/[0.04] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold min-h-[48px] flex items-center"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>

            <div className="border-t border-white/[0.05] pt-6">
              <GlowButton
                variant="primary"
                size="md"
                onClick={() => handleNavClick("#reserve")}
                className="w-full justify-center uppercase text-xs tracking-widest"
              >
                Reserve Table
              </GlowButton>
            </div>
          </div>
        </motion.nav>
      </motion.div>
    </>
  )
}

function AnimatedIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.div
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
    </motion.div>
  )
}
