"use client"

import React, { useState } from "react"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod/v4"
import { z } from "zod"

const validationSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
})

export function FormVerify() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({})
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [lastResult, setLastResult] = useState<any>(null)
  const [log, setLog] = useState<string[]>([])

  // Verify Conform compile and execution lifecycle
  const [form] = useForm({
    onValidate({ formData }) {
      const parsed = parseWithZod(formData, { schema: validationSchema })
      return parsed
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLog((prev) => [...prev, "Form: Submit event triggered"])

    const result = validationSchema.safeParse({ username, email })
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message
        }
      })
      setClientErrors(fieldErrors)
      setLastResult({ status: "error" })
      setLog((prev) => [...prev, "Form: Validation failed with schema errors"])
    } else {
      setClientErrors({})
      setLastResult({ status: "success", value: result.data })
      setLog((prev) => [...prev, `Form: Validation succeeded for ${result.data.username}`])
    }
  }

  return (
    <div className="p-6 bg-card border border-border rounded-xl space-y-6">
      <h2 className="text-lg font-bold text-card-foreground border-b border-border pb-2">Form & Schema Verification (Conform + Zod)</h2>

      <form onSubmit={handleSubmit} noValidate className="space-y-4 max-w-sm">
        {/* We keep the form id to verify Conform's form registry */}
        <input type="hidden" name="conform-id" value={form.id} />

        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-1">
            Username (min 3 chars)
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="alice"
            className="w-full px-3 py-2 bg-background border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {clientErrors.username && (
            <div className="text-red-500 text-[10px] mt-1">{clientErrors.username}</div>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alice@example.com"
            className="w-full px-3 py-2 bg-background border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {clientErrors.email && (
            <div className="text-red-500 text-[10px] mt-1">{clientErrors.email}</div>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 cursor-pointer"
        >
          Submit Form
        </button>
      </form>

      {lastResult && (
        <div className="p-3 bg-muted/40 rounded-lg text-xs space-y-1">
          <div className="font-bold text-muted-foreground">Submission Results:</div>
          <div>Status: <span className="font-mono text-foreground font-semibold">{lastResult.status}</span></div>
          {lastResult.status === "success" && (
            <div>Parsed: <span className="font-mono text-foreground">{JSON.stringify(lastResult.value)}</span></div>
          )}
        </div>
      )}

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
