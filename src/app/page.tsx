"use client"

import {
  DynSmoothScroll as SmoothScrollProvider,
  DynCursor as PremiumCursor,
  DynHeader as Header,
  DynHero as HeroSection,
  DynCapabilities as CapabilitiesSection,
  DynWorks as WorksSection,
  DynServices as ServicesSection,
  DynFaq as FaqSectionNew,
  DynTrust as TrustSection,
} from "@/components/demo/client-dynamic-imports"

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <PremiumCursor />

      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2 focus:bg-violet-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-bold"
      >
        Skip to main content
      </a>

      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Grain overlay — full page */}
        <div
          className="fixed inset-0 pointer-events-none z-[99] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
            opacity: 0.03,
          }}
          aria-hidden="true"
        />

        {/* Header */}
        <Header />

        {/* Main content */}
        <main id="main-content">
          {/* 01 — Hero */}
          <HeroSection />

          {/* Section divider */}
          <div className="section-line" aria-hidden="true" />

          {/* 02 — Capabilities */}
          <CapabilitiesSection />

          {/* Section divider */}
          <div className="section-line" aria-hidden="true" />

          {/* 03 — Selected Works */}
          <WorksSection />

          {/* Section divider */}
          <div className="section-line" aria-hidden="true" />

          {/* 04 — Engagement / Services */}
          <ServicesSection />

          {/* Section divider */}
          <div className="section-line" aria-hidden="true" />

          {/* 05 — FAQ */}
          <FaqSectionNew />

          {/* Section divider */}
          <div className="section-line" aria-hidden="true" />

          {/* 06 — Trust + CTA */}
          <TrustSection />
        </main>

        {/* Footer */}
        <footer
          className="relative border-t border-white/[0.04] py-16 overflow-hidden"
          style={{ background: "oklch(0.06 0.005 50)" }}
          role="contentinfo"
        >
          <div className="container mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-12">
              {/* Col 1: Brand info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5" aria-label="L'Étoile Dorée">
                  <div
                    className="relative h-7 w-7 rounded-lg flex items-center justify-center overflow-hidden"
                    style={{ background: "linear-gradient(135deg, oklch(0.75 0.12 75), oklch(0.60 0.15 60))" }}
                    aria-hidden="true"
                  >
                    <span className="text-background font-black text-xs">★</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif font-black text-sm tracking-[0.1em] text-white">L'Étoile</span>
                    <span className="text-gold text-[10px] font-black tracking-[0.15em] uppercase">Dorée</span>
                  </div>
                </div>
                <p className="text-white/40 text-xs leading-relaxed">
                  Experience the meeting of French precision and Italian warmth. A gastronomic haven in the heart of historic Paris.
                </p>
              </div>

              {/* Col 2: Contact */}
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold">Contact</h4>
                <address className="not-italic text-white/40 text-xs space-y-2">
                  <p>45 Rue du Faubourg Saint-Honoré,<br />75008 Paris, France</p>
                  <p className="font-mono text-white/50">+33 1 42 68 53 00</p>
                  <p className="font-mono text-white/50">reservations@letoiledoree.com</p>
                </address>
              </div>

              {/* Col 3: Hours */}
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold">Working Hours</h4>
                <div className="text-white/40 text-xs space-y-2">
                  <p><span className="font-semibold text-white/60">Monday – Sunday:</span><br />8:00 AM – 11:30 PM</p>
                  <p className="text-[10px] italic text-gold/60">*Kitchen closes at 10:45 PM</p>
                </div>
              </div>

              {/* Col 4: Newsletter */}
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold">Newsletter</h4>
                <p className="text-white/40 text-xs leading-relaxed">
                  Subscribe to receive private dinner invitations and seasonal menu releases.
                </p>
                <form className="flex flex-wrap gap-2" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 text-xs rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-gold/50"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-gold text-background hover:bg-gold/90 transition-colors"
                  >
                    Join
                  </button>
                </form>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <p className="text-[9px] font-mono uppercase tracking-[0.12em] text-white/20">
                © {new Date().getFullYear()} L&apos;ÉTOILE DORÉE PARIS. — ALL RIGHTS RESERVED
              </p>

              {/* Links */}
              <nav aria-label="Footer navigation">
                <ul className="flex gap-6" role="list">
                  {["Privacy Policy", "Terms of Service", "Sitemap"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-[10px] uppercase tracking-[0.15em] font-semibold text-white/25 hover:text-white/60 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-2 py-2 min-h-[36px] inline-flex items-center"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScrollProvider>
  )
}
