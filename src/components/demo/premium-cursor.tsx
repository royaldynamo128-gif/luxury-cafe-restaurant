"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

type CursorState = "default" | "hover" | "text" | "drag" | "magnetic"

export function PremiumCursor() {
  const [cursorState, setCursorState] = useState<CursorState>("default")
  const [isVisible, setIsVisible] = useState(false)
  const [cursorLabel, setCursorLabel] = useState("")

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 30, stiffness: 450, mass: 0.4 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const trailX = useSpring(mouseX, { damping: 40, stiffness: 220, mass: 0.8 })
  const trailY = useSpring(mouseY, { damping: 40, stiffness: 220, mass: 0.8 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
    // Make visible only if inside the viewport area
    if (e.clientY > 0 && e.clientX > 0 && e.clientX < window.innerWidth && e.clientY < window.innerHeight) {
      if (!isVisible) setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [mouseX, mouseY, isVisible])

  const [isTouchDevice, setIsTouchDevice] = useState(true) // Default to true to prevent flash on touch mount

  useEffect(() => {
    const isTouch = (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 1024
    )
    setIsTouchDevice(isTouch)
    if (isTouch) return

    // Hide default system cursor
    document.body.style.cursor = "none"

    // Global cursor visibility state
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)
    const handleBlur = () => setIsVisible(false)
    const handleFocus = () => setIsVisible(true)

    // Reset cursor state on click/mouseup to prevent cursor sticking
    const handleMouseUp = () => {
      setCursorState("default")
      setCursorLabel("")
    }

    // High-performance event delegation for hover states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return
      
      const interactable = target.closest("a, button, [role='button'], [data-cursor]") as HTMLElement
      if (interactable) {
        const cursorType = (interactable.dataset.cursor as CursorState) || "hover"
        const label = interactable.dataset.cursorLabel || ""
        setCursorState(cursorType)
        setCursorLabel(label)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return
      
      const interactable = target.closest("a, button, [role='button'], [data-cursor]") as HTMLElement
      if (interactable) {
        setCursorState("default")
        setCursorLabel("")
      }
    }

    // Event listeners
    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)
    window.addEventListener("blur", handleBlur)
    window.addEventListener("focus", handleFocus)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      document.body.style.cursor = ""
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("blur", handleBlur)
      window.removeEventListener("focus", handleFocus)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [handleMouseMove])

  const sizeMap = {
    default: { dot: 8, ring: 32, opacity: 1 },
    hover: { dot: 4, ring: 56, opacity: 0.9 },
    text: { dot: 2, ring: 80, opacity: 0.7 },
    drag: { dot: 6, ring: 48, opacity: 0.95 },
    magnetic: { dot: 0, ring: 64, opacity: 1 },
  }

  const config = sizeMap[cursorState]

  if (typeof window === "undefined" || isTouchDevice) return null

  return (
    <>
      {/* Trail (outer slow ring) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-white/10 mix-blend-difference will-change-transform"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: config.ring + 20,
          height: config.ring + 20,
          opacity: isVisible ? config.opacity * 0.4 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />

      {/* Main ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border mix-blend-difference will-change-transform"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: cursorState === "hover"
            ? "oklch(0.62 0.24 278)"
            : "rgba(255,255,255,0.5)",
        }}
        animate={{
          width: config.ring,
          height: config.ring,
          opacity: isVisible ? config.opacity : 0,
          backgroundColor: cursorState === "hover" ? "oklch(0.62 0.24 278 / 0.1)" : "transparent",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {cursorLabel && (
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold uppercase tracking-widest text-white whitespace-nowrap">
            {cursorLabel}
          </span>
        )}
      </motion.div>

      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full bg-white will-change-transform"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: config.dot,
          height: config.dot,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.08 }}
      />
    </>
  )
}
