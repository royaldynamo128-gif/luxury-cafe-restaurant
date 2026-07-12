"use client"

import React, { useEffect, useState } from "react"
import MuxPlayer from "@mux/mux-player-react"
import { generateUploadButton } from "@uploadthing/react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UploadButton = generateUploadButton<any>()

interface SharpResult {
  status: "PASS" | "FAIL"
  details?: string
  error?: string
}

export function MediaVerify() {
  const [sharpResult, setSharpResult] = useState<SharpResult | null>(null)
  const [log, setLog] = useState<string[]>([
    "Mux Player: React component mounted",
    "UploadThing: Button component loaded",
  ])

  useEffect(() => {
    // Check sharp status via the API route
    fetch("/api/verification")
      .then((res) => res.json())
      .then((data: Record<string, SharpResult>) => {
        if (data.Sharp) {
          setSharpResult(data.Sharp)
          setTimeout(() => {
            setLog((prev) => [...prev, `Sharp (Server): ${data.Sharp.details || data.Sharp.error}`])
          }, 0)
        }
      })
      .catch((err) => {
        const errMsg = err instanceof Error ? err.message : String(err)
        setTimeout(() => {
          setLog((prev) => [...prev, `Sharp (Server): Fetch failed - ${errMsg}`])
        }, 0)
      })
  }, [])

  return (
    <div className="p-6 bg-card border border-border rounded-xl space-y-6">
      <h2 className="text-lg font-bold text-card-foreground border-b border-border pb-2">Media & Image Processing Verification</h2>

      <div className="space-y-4">
        {/* Mux Player */}
        <div>
          <div className="text-xs font-semibold text-muted-foreground mb-1.5">Mux Player</div>
          <div className="w-full max-w-md overflow-hidden rounded-lg border border-border bg-black">
            <MuxPlayer
              playbackId="DS00S37hhvN7JZQjoc2w7K00dB8FI19R1"
              metadataVideoTitle="Verification Demo"
              metadataViewerUserId="verify-agent"
              muted
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>

        {/* UploadThing Button */}
        <div>
          <div className="text-xs font-semibold text-muted-foreground mb-1.5">UploadThing Uploader Component</div>
          <div className="p-4 bg-muted/40 border border-border/50 rounded-lg flex items-center justify-center">
            {/* Renders an UploadButton to confirm compilation and styling */}
            <UploadButton
              endpoint="https://uploadthing.com/api/upload"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClientUploadComplete={(res: any) => {
                console.log("Files: ", res)
                alert("Upload Completed")
              }}
              onUploadError={(error: Error) => {
                console.log(`ERROR! ${error.message}`)
              }}
            />
          </div>
        </div>

        {/* Sharp Server Test Details */}
        {sharpResult && (
          <div className="p-3 bg-muted/50 rounded-lg text-xs space-y-1">
            <div className="font-bold text-muted-foreground">Sharp API Verification:</div>
            <div>Status: <span className="font-mono text-green-500 font-semibold">{sharpResult.status}</span></div>
            <div>Result: <span className="text-foreground">{sharpResult.details || sharpResult.error}</span></div>
          </div>
        )}
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
