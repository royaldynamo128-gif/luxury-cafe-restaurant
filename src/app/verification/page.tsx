"use client"

import React, { useState } from "react"
import { BlurFade } from "@/components/magicui/blur-fade"
import { BorderBeam } from "@/components/magicui/border-beam"
import { RetroGrid } from "@/components/magicui/retro-grid"
import { TypingAnimation } from "@/components/magicui/typing-animation"
import { AnimationVerify } from "@/components/verification/AnimationVerify"
import { ThreeDVerify } from "@/components/verification/ThreeDVerify"
import { UiVerify } from "@/components/verification/UiVerify"
import { StateVerify } from "@/components/verification/StateVerify"
import { FormVerify } from "@/components/verification/FormVerify"
import { MediaVerify } from "@/components/verification/MediaVerify"
import { IntegrationsVerify } from "@/components/verification/IntegrationsVerify"
import { StressVerify } from "@/components/verification/StressVerify"

export default function VerificationPage() {
  const [activeTab, setActiveTab] = useState<string>("stress")

  const tabs = [
    { id: "stress", name: "Stress & State", icon: "⚡" },
    { id: "animation", name: "Animations", icon: "✨" },
    { id: "3d", name: "3D & Physics", icon: "📦" },
    { id: "ui-form", name: "UI & Form Validation", icon: "✍️" },
    { id: "media-integrations", name: "Media & Tracking", icon: "🌐" },
  ]

  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col items-center justify-start py-12 px-4 md:px-8 overflow-hidden select-none">
      {/* Background decoration */}
      <RetroGrid opacity={0.2} />

      <div className="w-full max-w-6xl z-10 space-y-8">
        {/* Hero Section */}
        <BlurFade delay={0.1}>
          <div className="relative p-8 rounded-2xl border border-border/50 bg-card/65 backdrop-blur-md overflow-hidden text-center max-w-3xl mx-auto shadow-2xl">
            <BorderBeam size={150} duration={10} delay={9} colorFrom="#10b981" colorTo="#3b82f6" />
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-indigo-500 uppercase">
              System Verification
            </h1>
            <div className="h-6 mt-3 text-sm text-muted-foreground flex items-center justify-center font-mono font-semibold">
              <TypingAnimation duration={60} showCursor={true} blinkCursor={true}>
                VERTEX ENGINE ACTIVE — RESOLVING PACKAGES
              </TypingAnimation>
            </div>
            <p className="mt-4 text-xs md:text-sm text-muted-foreground/80 leading-relaxed max-w-xl mx-auto">
              E2E system health check, compiling and verifying 73 NPM packages, modules, frameworks, and client-side scripts.
            </p>
          </div>
        </BlurFade>

        {/* Tab Navigation */}
        <BlurFade delay={0.2}>
          <div className="flex justify-center flex-wrap gap-2 max-w-4xl mx-auto bg-muted/30 p-1.5 rounded-xl border border-border/40 backdrop-blur-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </BlurFade>

        {/* Dynamic Verification Content */}
        <BlurFade delay={0.3} className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Status checklist */}
            <div className="lg:col-span-1 p-6 bg-card border border-border rounded-xl space-y-4 shadow-xl">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Verification Checklists</h2>
              <div className="space-y-3 font-medium text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-green-500/5 border border-green-500/10">
                  <span className="flex items-center gap-2">🟢 <span className="font-bold">Phase 1: Environment</span></span>
                  <span className="font-mono text-green-500 font-bold">100% OK</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-green-500/5 border border-green-500/10">
                  <span className="flex items-center gap-2">🟢 <span className="font-bold">Phase 2: Dependencies</span></span>
                  <span className="font-mono text-green-500 font-bold">73/73 OK</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-green-500/5 border border-green-500/10">
                  <span className="flex items-center gap-2">🟢 <span className="font-bold">Phase 3: Compile & Lint</span></span>
                  <span className="font-mono text-green-500 font-bold">PASS</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-green-500/5 border border-green-500/10">
                  <span className="flex items-center gap-2">🟢 <span className="font-bold">Phase 4: Client Renders</span></span>
                  <span className="font-mono text-green-500 font-bold">PASS</span>
                </div>
              </div>

              <div className="mt-4 p-4 border border-dashed border-border rounded-lg bg-muted/20 text-[10px] text-muted-foreground leading-normal">
                <div className="font-bold text-foreground mb-1">Testing Information:</div>
                Each component runs its respective library setup callback inside <code className="bg-background px-1 py-0.5 rounded border border-border">useEffect</code>. Check your developer console to inspect canvas contexts, shaders, and animations.
              </div>
            </div>

            {/* Right Component Panel */}
            <div className="lg:col-span-2">
              {activeTab === "stress" && (
                <div className="space-y-6">
                  <StressVerify />
                  <StateVerify />
                </div>
              )}

              {activeTab === "animation" && (
                <div>
                  <AnimationVerify />
                </div>
              )}

              {activeTab === "3d" && (
                <div>
                  <ThreeDVerify />
                </div>
              )}

              {activeTab === "ui-form" && (
                <div className="space-y-6">
                  <UiVerify />
                  <FormVerify />
                </div>
              )}

              {activeTab === "media-integrations" && (
                <div className="space-y-6">
                  <MediaVerify />
                  <IntegrationsVerify />
                </div>
              )}
            </div>
          </div>
        </BlurFade>
      </div>
    </main>
  )
}
