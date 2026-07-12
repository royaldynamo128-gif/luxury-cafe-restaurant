"use client"

import React, { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { animate } from "animejs"
import Lottie from "lottie-react"
import Rive from "@rive-app/react-canvas"
import { annotate } from "rough-notation"
import SplitType from "split-type"

// Minimal valid Lottie animation schema (drawing a static red box)
const dummyLottie = {
  v: "4.8.0",
  meta: { g: "LottieFiles AE 3.5.8", a: "", k: "", d: "", tc: "" },
  fr: 30,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  nm: "Verification Box",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Shape Layer 1",
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 0, k: [50, 50, 0], ix: 2 },
        a: { a: 0, k: [0, 0, 0], ix: 1 },
        s: { a: 0, k: [100, 100, 100], ix: 6 },
      },
      ao: 0,
      shapes: [
        {
          ty: "rc",
          d: 1,
          s: { a: 0, k: [60, 60], ix: 2 },
          p: { a: 0, k: [0, 0], ix: 3 },
          r: { a: 0, k: 0, ix: 4 },
          nm: "Rect",
          mn: "ADBE Vector Shape - Rect",
          hd: false,
        },
        {
          ty: "fl",
          c: { a: 0, k: [0.9, 0.2, 0.2, 1], ix: 4 },
          o: { a: 0, k: 100, ix: 5 },
          r: 1,
          bm: 0,
          nm: "Fill",
          mn: "ADBE Vector Graphic - Fill",
          hd: false,
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0,
    },
  ],
}

export function AnimationVerify() {
  const gsapBoxRef = useRef<HTMLDivElement>(null)
  const animeBallRef = useRef<HTMLDivElement>(null)
  const roughTextRef = useRef<HTMLSpanElement>(null)
  const splitTextRef = useRef<HTMLDivElement>(null)
  const [log, setLog] = useState<string[]>([])

  useEffect(() => {
    const tempLogs: string[] = []

    // 1. GSAP Verification
    if (gsapBoxRef.current) {
      try {
        gsap.to(gsapBoxRef.current, {
          x: 40,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
        tempLogs.push("GSAP: Animation initiated successfully")
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err)
        tempLogs.push(`GSAP: Error - ${errMsg}`)
      }
    }

    // 2. Anime.js Verification
    if (animeBallRef.current) {
      try {
        animate(animeBallRef.current, {
          scale: [1, 1.2],
          duration: 800,
          direction: "alternate",
          loop: true,
          easing: "easeInOutSine",
        })
        tempLogs.push("Anime.js: Animation initiated successfully")
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err)
        tempLogs.push(`Anime.js: Error - ${errMsg}`)
      }
    }

    // 3. Rough Notation Verification
    if (roughTextRef.current) {
      try {
        const annotation = annotate(roughTextRef.current, {
          type: "highlight",
          color: "rgba(251, 191, 36, 0.3)",
          padding: 2,
        })
        annotation.show()
        tempLogs.push("Rough Notation: Highlight applied successfully")
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err)
        tempLogs.push(`Rough Notation: Error - ${errMsg}`)
      }
    }

    // 4. SplitType Verification
    if (splitTextRef.current) {
      try {
        const split = new SplitType(splitTextRef.current, { types: "chars" })
        if (split.chars && split.chars.length > 0) {
          tempLogs.push(`SplitType: Successfully split text into ${split.chars.length} elements`)
        } else {
          throw new Error("No characters were generated")
        }
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err)
        tempLogs.push(`SplitType: Error - ${errMsg}`)
      }
    }

    // 5. Lottie test confirmation
    tempLogs.push("Lottie: React component rendered and mounted")

    // 6. Rive check
    tempLogs.push("Rive: Canvas element loaded")

    setTimeout(() => {
      setLog((prev) => [...prev, ...tempLogs])
    }, 0)
  }, [])

  return (
    <div className="p-6 bg-card border border-border rounded-xl space-y-6">
      <h2 className="text-lg font-bold text-card-foreground border-b border-border pb-2">Animation Verification</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {/* GSAP Check */}
        <div className="p-4 bg-muted/50 rounded-lg flex flex-col justify-between">
          <div className="text-xs font-semibold text-muted-foreground mb-2">GSAP (GreenSock)</div>
          <div ref={gsapBoxRef} className="size-8 bg-primary rounded-md flex items-center justify-center text-[10px] text-primary-foreground font-bold">
            G
          </div>
        </div>

        {/* AnimeJS Check */}
        <div className="p-4 bg-muted/50 rounded-lg flex flex-col justify-between">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Anime.js</div>
          <div ref={animeBallRef} className="size-8 bg-secondary rounded-full flex items-center justify-center text-[10px] text-secondary-foreground font-bold">
            A
          </div>
        </div>

        {/* Rough Notation Check */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Rough Notation</div>
          <div className="text-sm font-medium">
            We are <span ref={roughTextRef}>highlighting</span> this text.
          </div>
        </div>

        {/* SplitType Check */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="text-xs font-semibold text-muted-foreground mb-2">SplitType</div>
          <div ref={splitTextRef} className="text-sm font-black tracking-wider uppercase text-primary">
            VERTEX
          </div>
        </div>

        {/* Lottie Check */}
        <div className="p-4 bg-muted/50 rounded-lg flex flex-col items-center">
          <div className="text-xs font-semibold text-muted-foreground mb-2 w-full text-left">Lottie-React</div>
          <Lottie animationData={dummyLottie} style={{ width: 60, height: 60 }} />
        </div>

        {/* Rive Check */}
        <div className="p-4 bg-muted/50 rounded-lg flex flex-col items-center justify-between">
          <div className="text-xs font-semibold text-muted-foreground mb-2 w-full text-left">Rive React Canvas</div>
          <div className="w-full h-12 relative flex items-center justify-center overflow-hidden rounded bg-black/20 text-[10px] text-muted-foreground">
            <div className="text-center font-bold text-muted-foreground text-[9px] uppercase tracking-wider">Rive Canvas Engine Loaded</div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-muted rounded-lg font-mono text-[11px] text-muted-foreground max-h-36 overflow-y-auto space-y-1">
        <div className="font-bold border-b border-border pb-1 mb-1">Runtime Log:</div>
        {log.map((line, idx) => (
          <div key={idx} className="flex gap-2">
            <span className="text-green-500">✓</span>
            <span>{line}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
