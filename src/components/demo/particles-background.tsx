"use client"

import React, { useEffect, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"

export function ParticlesBackground() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initParticlesEngine(async (engine: any) => {
      // Lazy load standard/slim shapes and presets
      const { loadSlim } = await import("@tsparticles/slim")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await loadSlim(engine as any)
    }).then(() => {
      setInit(true)
    })
  }, [])

  if (!init) return null

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 -z-10 opacity-30 dark:opacity-20 pointer-events-none"
      options={{
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: { enable: false, mode: "push" },
            onHover: { enable: true, mode: "grab" },
          },
          modes: {
            grab: { distance: 150, links: { opacity: 0.5 } },
          },
        },
        particles: {
          color: { value: "#ffffff" },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: { enable: true, area: 800 },
            value: 40,
          },
          opacity: { value: 0.5 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any}
    />
  )
}
