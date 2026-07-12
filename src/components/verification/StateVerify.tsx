"use client"

import React, { useEffect, useState, useMemo } from "react"
import { create } from "zustand"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from "@tanstack/react-table"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts"
import { Card, Metric, Text } from "@tremor/react"

// 1. Zustand Store Definition
interface VerifyStore {
  verificationsCount: number
  incrementCount: () => void
}
const useVerifyStore = create<VerifyStore>((set) => ({
  verificationsCount: 0,
  incrementCount: () => set((state) => ({ verificationsCount: state.verificationsCount + 1 })),
}))

// 2. Query Client initialization
const queryClient = new QueryClient()

// Column helper for React Table
interface TableRow {
  name: string
  status: string
  details?: string
  error?: string
}
const columnHelper = createColumnHelper<TableRow>()

// Chart data
const chartData = [
  { name: "Node.js", score: 100 },
  { name: "Drizzle", score: 100 },
  { name: "tRPC", score: 100 },
  { name: "Orama", score: 100 },
  { name: "Sharp", score: 100 },
]

function StateVerifyContent() {
  const { verificationsCount, incrementCount } = useVerifyStore()
  const [log, setLog] = useState<string[]>([])

  // Zustand Verification
  useEffect(() => {
    setTimeout(() => {
      setLog((prev) => [...prev, `Zustand: Store active, initial verifications count is ${verificationsCount}`])
    }, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // React Query Verification
  const { data: serverReport, isLoading, error } = useQuery<Record<string, { status: "PASS" | "FAIL"; details?: string; error?: string }>>({
    queryKey: ["verificationReport"],
    queryFn: async () => {
      const res = await fetch("/api/verification")
      if (!res.ok) throw new Error("API call failed")
      return res.json()
    },
  })

  useEffect(() => {
    if (serverReport) {
      setTimeout(() => {
        setLog((prev) => [...prev, "React Query: Verification report successfully loaded from server"])
      }, 0)
    }
  }, [serverReport])

  // React Table Verification
  const tableData = useMemo(() => {
    if (!serverReport) return []
    return Object.entries(serverReport).map(([name, val]) => ({
      name,
      status: val.status,
      details: val.details,
      error: val.error,
    }))
  }, [serverReport])

  const columns = useMemo(() => [
    columnHelper.accessor("name", {
      header: () => "Library / System",
      cell: (info) => <span className="font-bold text-foreground">{info.getValue()}</span>,
    }),
    columnHelper.accessor("status", {
      header: () => "Status",
      cell: (info) => {
        const val = info.getValue()
        return (
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${val === "PASS" ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}>
            {val}
          </span>
        )
      },
    }),
    columnHelper.accessor("details", {
      header: () => "Details",
      cell: (info) => <span className="text-muted-foreground text-xs">{info.getValue() || info.row.original.error || "N/A"}</span>,
    }),
  ], [])

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleIncrement = () => {
    incrementCount()
    setLog((prev) => [...prev, `Zustand: Count incremented to ${verificationsCount + 1}`])
  }

  return (
    <div className="p-6 bg-card border border-border rounded-xl space-y-6">
      <h2 className="text-lg font-bold text-card-foreground border-b border-border pb-2">State, Query & Table Verification</h2>

      {/* Zustand and Tremor */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-muted/50 rounded-lg flex flex-col justify-between">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Zustand State</div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleIncrement}
              className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 cursor-pointer"
            >
              Increment Log Count
            </button>
            <div className="text-sm font-bold text-foreground">{verificationsCount} clicks</div>
          </div>
        </div>

        {/* Tremor Card */}
        <Card className="p-4 bg-muted/50 border-0 rounded-lg flex flex-col justify-center shadow-none">
          <Text className="text-xs font-semibold text-muted-foreground">Tremor System Metric</Text>
          <Metric className="text-lg font-bold text-foreground">99.8%</Metric>
        </Card>
      </div>

      {/* Recharts Area Chart */}
      <div className="p-4 bg-muted/50 rounded-lg">
        <div className="text-xs font-semibold text-muted-foreground mb-3">Recharts Chart Verification</div>
        <div className="w-full h-32">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#6b7280" fontSize={9} />
              <YAxis stroke="#6b7280" fontSize={9} domain={[0, 120]} />
              <Tooltip />
              <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* React Table */}
      <div>
        <div className="text-xs font-semibold text-muted-foreground mb-2">React Table + React Query Server Report</div>
        {isLoading ? (
          <div className="text-xs text-muted-foreground p-4 bg-muted/30 rounded border border-border text-center">Loading Server Verification Data...</div>
        ) : error ? (
          <div className="text-xs text-red-500 p-4 bg-red-500/10 rounded border border-red-500/20 text-center">Failed to fetch server data: {error.message}</div>
        ) : (
          <div className="overflow-x-auto border border-border rounded-lg bg-card" tabIndex={0} aria-label="Verification results table">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/40">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-4 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-muted/10 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-2 whitespace-nowrap text-xs text-foreground">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
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

export function StateVerify() {
  return (
    <QueryClientProvider client={queryClient}>
      <StateVerifyContent />
    </QueryClientProvider>
  )
}
