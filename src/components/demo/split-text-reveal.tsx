"use client"

import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitType from "split-type"

gsap.registerPlugin(ScrollTrigger)

interface SplitTextRevealProps {
  children: string
  className?: string
  type?: "chars" | "words" | "lines"
  stagger?: number
  delay?: number
  as?: React.ElementType
  scrub?: boolean
}

export function SplitTextReveal({
  children,
  className = "",
  type = "words",
  stagger = 0.06,
  delay = 0,
  as: Tag = "div",
  scrub = false,
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null)
  const splitRef = useRef<SplitType | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      gsap.set(el, { opacity: 1 })
      return
    }

    splitRef.current = new SplitType(el, { types: type })
    const targets = splitRef.current[type] ?? []

    gsap.set(targets, {
      y: type === "chars" ? 60 : 40,
      opacity: 0,
      rotateX: type === "chars" ? 45 : 0,
    })

    if (scrub) {
      gsap.to(targets, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 40%",
          scrub: 0.8,
        },
      })
    } else {
      gsap.to(targets, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger,
        delay,
        ease: "power3.out",
        duration: 0.9,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      })
    }

    return () => {
      splitRef.current?.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [children, type, stagger, delay, scrub])

  return React.createElement(
    Tag,
    { ref: containerRef, className: `overflow-hidden ${className}` },
    children
  )
}
