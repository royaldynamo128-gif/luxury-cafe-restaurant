"use client"

import React, { useEffect, useRef } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Disable Lenis on mobile devices and touch screens for native scrolling performance
    const isTouch = typeof window !== "undefined" && (
      window.innerWidth < 1024 ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    )

    if (isTouch) {
      // Use CSS smooth scroll as fallback
      document.documentElement.style.scrollBehavior = "smooth"
      return () => {
        document.documentElement.style.scrollBehavior = ""
      }
    }

    const lenis = new Lenis({
      duration: 0.5, // Short duration for immediate stopping
      easing: (t) => 1 - Math.pow(1 - t, 4), // Snappy cubic ease-out for natural deceleration
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
    })

    lenisRef.current = lenis

    // Connect lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    const handleTick = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(handleTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(handleTick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
