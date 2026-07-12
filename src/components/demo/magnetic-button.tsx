"use client"

import { useRef, useEffect, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  "data-cursor"?: string
  "data-cursor-label"?: string
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  // Motion values to avoid React re-renders during mouse moves
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 25, stiffness: 250, mass: 0.4 })
  const springY = useSpring(y, { damping: 25, stiffness: 250, mass: 0.4 })

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = buttonRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength
      x.set(deltaX)
      y.set(deltaY)
    },
    [strength, x, y]
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  useEffect(() => {
    const el = buttonRef.current
    if (!el) return
    el.addEventListener("mousemove", handleMouseMove)
    el.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      el.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return (
    <motion.button
      ref={buttonRef}
      className={`relative will-change-transform ${className}`}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      data-cursor="hover"
      {...props}
    >
      {children}
    </motion.button>
  )
}

interface GlowButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  type?: "button" | "submit" | "reset"
}

export function GlowButton({
  children,
  className = "",
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
}: GlowButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2.5 text-xs min-h-[44px]",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-sm",
  }

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-gold to-caramel
      text-background font-bold
      hover:from-gold/90 hover:to-caramel/90
      shadow-[0_0_20px_oklch(0.75_0.12_75_/_0.2)]
      hover:shadow-[0_0_40px_oklch(0.75_0.12_75_/_0.4),_0_0_80px_oklch(0.75_0.12_75_/_0.1)]
    `,
    outline: `
      border border-white/10 text-white/80
      hover:border-gold/50 hover:text-white
      hover:bg-gold/5
      hover:shadow-[0_0_20px_oklch(0.75_0.12_75_/_0.1)]
    `,
    ghost: `
      text-white/60 hover:text-white
      hover:bg-white/5
    `,
  }

  return (
    <motion.button
      type={type}
      className={`
        relative overflow-hidden rounded-xl font-semibold
        transition-all duration-300 cursor-pointer
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black
        will-change-transform
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
      data-cursor="hover"
    >
      {/* Shimmer overlay — CSS-only on hover, no loop animation */}
      <span
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )
}
