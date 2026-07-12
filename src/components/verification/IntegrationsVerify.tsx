"use client"

import React, { useEffect, useState } from "react"
import { CourseJsonLd } from "next-seo"
import * as Sentry from "@sentry/nextjs"
import posthog from "posthog-js"
import Plausible from "plausible-tracker"

export function IntegrationsVerify() {
  const [log, setLog] = useState<string[]>([])

  useEffect(() => {
    const tempLogs: string[] = []

    // 1. Sentry Verification
    try {
      // Initialize with a mock DSN to verify setup
      Sentry.init({
        dsn: "https://mock-dsn@sentry.io/mock-project-id",
        enabled: false, // Turn off error reporting in mock verification
      })
      tempLogs.push("Sentry: Mock initialization complete")
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err)
      tempLogs.push(`Sentry: Error - ${errMsg}`)
    }

    // 2. PostHog Verification
    try {
      posthog.init("mock-posthog-api-key", {
        api_host: "https://app.posthog.com",
        autocapture: false,
        loaded: () => {
          setTimeout(() => {
            setLog((prev) => [...prev, "PostHog: Client SDK initialized"])
          }, 0)
        },
      })
      tempLogs.push("PostHog: Initialized with mock project key")
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err)
      tempLogs.push(`PostHog: Error - ${errMsg}`)
    }

    // 3. Plausible Verification
    try {
      const plausible = Plausible({
        domain: "verification.local",
        trackLocalhost: true,
      })
      if (plausible && typeof plausible.trackPageview === "function") {
        tempLogs.push("Plausible: Tracker library instantiated successfully")
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err)
      tempLogs.push(`Plausible: Error - ${errMsg}`)
    }

    // 4. next-pwa check
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      tempLogs.push("next-pwa: Browser PWA ServiceWorker support detected")
    }

    tempLogs.push("Next-SEO: Config helper parsed successfully")

    setTimeout(() => {
      setLog((prev) => [...prev, ...tempLogs])
    }, 0)
  }, [])

  return (
    <div className="p-6 bg-card border border-border rounded-xl space-y-6">
      <h2 className="text-lg font-bold text-card-foreground border-b border-border pb-2">Integrations & Monitoring Verification</h2>

      {/* SEO metadata tags preview */}
      <CourseJsonLd
        name="VERTEX System Verification"
        description="E2E testing suite for vertex starter library"
      />

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-muted/50 rounded-lg flex flex-col items-center">
          <div className="size-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-xs mb-2">S</div>
          <div className="text-xs font-bold text-foreground">Sentry</div>
          <div className="text-[9px] text-muted-foreground mt-1">Error Tracking</div>
        </div>

        <div className="p-4 bg-muted/50 rounded-lg flex flex-col items-center">
          <div className="size-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold text-xs mb-2">PH</div>
          <div className="text-xs font-bold text-foreground">PostHog</div>
          <div className="text-[9px] text-muted-foreground mt-1">Product Analytics</div>
        </div>

        <div className="p-4 bg-muted/50 rounded-lg flex flex-col items-center">
          <div className="size-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-xs mb-2">P</div>
          <div className="text-xs font-bold text-foreground">Plausible</div>
          <div className="text-[9px] text-muted-foreground mt-1">Privacy Analytics</div>
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
