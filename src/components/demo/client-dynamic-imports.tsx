"use client"

import dynamic from "next/dynamic"

// These components use ssr:false — they must be in a "use client" module
// AND Turbopack requires no ssr:false in the same module as SSR components

export const DynSmoothScroll = dynamic(
  () => import("./smooth-scroll-provider").then((m) => m.SmoothScrollProvider),
  { ssr: false }
)

export const DynCursor = dynamic(
  () => import("./premium-cursor").then((m) => m.PremiumCursor),
  { ssr: false }
)

export const DynHeader = dynamic(
  () => import("./header").then((m) => m.Header),
  { ssr: false }
)

export const DynHero = dynamic(
  () => import("./hero-section").then((m) => m.HeroSection),
  { ssr: false }
)

export const DynCapabilities = dynamic(
  () => import("./capabilities-section").then((m) => m.CapabilitiesSection),
  { ssr: false }
)

export const DynWorks = dynamic(
  () => import("./works-section").then((m) => m.WorksSection),
  { ssr: false }
)

export const DynServices = dynamic(
  () => import("./services-section").then((m) => m.ServicesSection),
  { ssr: false }
)

export const DynFaq = dynamic(
  () => import("./faq-section-new").then((m) => m.FaqSectionNew),
  { ssr: false }
)

export const DynTrust = dynamic(
  () => import("./trust-section").then((m) => m.TrustSection),
  { ssr: false }
)
