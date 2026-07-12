"use client"

import { useRef, useCallback, useState } from "react"
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  tiltStrength?: number
}

export function GlassCard({
  children,
  className = "",
  glowColor = "oklch(0.62 0.24 278)",
  tiltStrength = 6,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Motion values for tilt — updates bypass React render cycle completely
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(x, { damping: 35, stiffness: 350, mass: 0.5 })
  const rotateY = useSpring(y, { damping: 35, stiffness: 350, mass: 0.5 })

  // Motion values for glow position
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const rotY = ((e.clientX - centerX) / (rect.width / 2)) * tiltStrength
      const rotX = -((e.clientY - centerY) / (rect.height / 2)) * tiltStrength
      
      const glX = ((e.clientX - rect.left) / rect.width) * 100
      const glY = ((e.clientY - rect.top) / rect.height) * 100
      
      x.set(rotX)
      y.set(rotY)
      glowX.set(glX)
      glowY.set(glY)
    },
    [tiltStrength, x, y, glowX, glowY]
  )

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
    glowX.set(50)
    glowY.set(50)
    setIsHovered(false)
  }, [x, y, glowX, glowY])

  // Radial gradients computed via framer-motion template — zero layout paints
  const glowBackground = useMotionTemplate`radial-gradient(300px at ${glowX}% ${glowY}%, ${glowColor}15, transparent 70%)`
  const borderBackground = useMotionTemplate`radial-gradient(200px at ${glowX}% ${glowY}%, ${glowColor}30, transparent 60%)`

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl premium-card will-change-transform ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {/* Cursor glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
        style={{
          background: glowBackground,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Glass border highlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
        style={{
          background: borderBackground,
          opacity: isHovered ? 1 : 0,
          maskImage: "linear-gradient(black, black)",
          WebkitMaskImage: "linear-gradient(black, black)",
          padding: "1px",
        }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
