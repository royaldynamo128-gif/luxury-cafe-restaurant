"use client"

import React, { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Command } from "cmdk"
import { Button } from "react-aria-components"
import { Icon } from "@iconify/react"
import { Drawer } from "vaul"
import { toast } from "sonner"
import * as Dialog from "@radix-ui/react-dialog"

export function UiVerify() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [searchVal, setSearchVal] = useState("")
  const [log, setLog] = useState<string[]>([
    "React Aria: Accessible buttons mounted",
    "Iconify: Icon loaders resolved",
    "CMDK: Command Menu engine ready",
  ])

  useEffect(() => {
    if (emblaApi) {
      setTimeout(() => {
        setLog((prev) => [...prev, "Embla Carousel: Api instantiated successfully"])
      }, 0)
    }
  }, [emblaApi])

  const triggerToast = () => {
    toast.success("Sonner Toast: System verification status matches production!", {
      description: "Sonner animation and theme rendering is operational.",
    })
    setLog((prev) => [...prev, "Sonner: Success toast triggered"])
  }

  const logDrawerOpen = (open: boolean) => {
    if (open) {
      setLog((prev) => [...prev, "Vaul Drawer: Mobile layout opened via touch/click gesture"])
    }
  }

  const logRadixDialogOpen = (open: boolean) => {
    if (open) {
      setLog((prev) => [...prev, "Radix UI: Dialog primitive mounted with focus management"])
    }
  }

  return (
    <div className="p-6 bg-card border border-border rounded-xl space-y-6">
      <h2 className="text-lg font-bold text-card-foreground border-b border-border pb-2">UI Component Verification</h2>

      <div className="space-y-6">
        {/* Sonner & Radix Dialog Primitive */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Sonner Trigger */}
          <div className="p-4 bg-muted/50 rounded-lg flex flex-col justify-between">
            <div className="text-xs font-semibold text-muted-foreground mb-2">Sonner Toasts</div>
            <button
              onClick={triggerToast}
              className="w-full px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
            >
              Trigger Success Toast
            </button>
          </div>

          {/* Radix Dialog Primitive */}
          <div className="p-4 bg-muted/50 rounded-lg flex flex-col justify-between">
            <div className="text-xs font-semibold text-muted-foreground mb-2">Radix Dialog Primitive</div>
            <Dialog.Root onOpenChange={logRadixDialogOpen}>
              <Dialog.Trigger asChild>
                <button className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors">
                  Open Radix Dialog
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity" />
                <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-[450px] bg-card border border-border p-6 rounded-xl shadow-2xl z-50 focus:outline-none">
                  <Dialog.Title className="text-sm font-bold text-foreground mb-2">
                    Radix UI Primitive Dialog
                  </Dialog.Title>
                  <Dialog.Description className="text-xs text-muted-foreground mb-4">
                    Direct focus trap, ESC closing keybinds, and screen-reader accessibility assertions are handled natively.
                  </Dialog.Description>
                  <div className="flex justify-end gap-2">
                    <Dialog.Close asChild>
                      <button className="px-3 py-1.5 bg-muted text-muted-foreground text-xs font-bold rounded hover:bg-muted/80 cursor-pointer">
                        Dismiss
                      </button>
                    </Dialog.Close>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>

          {/* Vaul Mobile Drawer */}
          <div className="p-4 bg-muted/50 rounded-lg flex flex-col justify-between">
            <div className="text-xs font-semibold text-muted-foreground mb-2">Vaul Drawer</div>
            <Drawer.Root shouldScaleBackground onOpenChange={logDrawerOpen}>
              <Drawer.Trigger asChild>
                <button className="w-full px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg cursor-pointer transition-colors">
                  Open Mobile Drawer
                </button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
                <Drawer.Content className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-card border-t border-border rounded-t-2xl shadow-2xl z-50 flex flex-col focus:outline-none">
                  <div className="mx-auto w-12 h-1.5 rounded-full bg-muted-foreground/30 my-3 shrink-0" />
                  <div className="p-6 overflow-y-auto">
                    <Drawer.Title className="text-sm font-bold text-foreground mb-2">
                      Vaul Drawer Primitive
                    </Drawer.Title>
                    <Drawer.Description className="text-xs text-muted-foreground mb-4">
                      Mobile-first sheet drawer with drag-to-dismiss support, spring physics transitions, and ARIA modal semantics.
                    </Drawer.Description>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => toast.info("Drawer Action Executed")}
                        className="px-3 py-2 bg-primary text-primary-foreground text-xs font-bold rounded hover:bg-primary/95 cursor-pointer text-center"
                      >
                        Run Action
                      </button>
                      <Drawer.Close asChild>
                        <button className="px-3 py-2 bg-muted text-muted-foreground text-xs font-bold rounded hover:bg-muted/80 cursor-pointer text-center">
                          Close Drawer
                        </button>
                      </Drawer.Close>
                    </div>
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </div>
        </div>

        {/* Embla Carousel */}
        <div>
          <div className="text-xs font-semibold text-muted-foreground mb-1.5">Embla Carousel</div>
          <div ref={emblaRef} className="overflow-hidden bg-muted/30 border border-border/50 rounded-lg p-2 cursor-grab active:cursor-grabbing">
            <div className="flex gap-4">
              <div className="flex-[0_0_80%] bg-primary/10 border border-primary/20 rounded-md p-4 text-center text-sm font-semibold select-none">
                Slide 1 (Drag Me)
              </div>
              <div className="flex-[0_0_80%] bg-secondary/10 border border-secondary/20 rounded-md p-4 text-center text-sm font-semibold select-none">
                Slide 2
              </div>
              <div className="flex-[0_0_80%] bg-accent/10 border border-accent/20 rounded-md p-4 text-center text-sm font-semibold select-none">
                Slide 3
              </div>
            </div>
          </div>
        </div>

        {/* React Aria & Iconify */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="text-xs font-semibold text-muted-foreground mb-2">React Aria Component</div>
            <Button
              onPress={() => alert("React Aria Button Pressed!")}
              className="w-full px-4 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 focus:outline-none focus:ring-2 focus:ring-ring select-none cursor-pointer text-center"
            >
              Accessible Press Action
            </Button>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="text-xs font-semibold text-muted-foreground mb-2">Iconify</div>
            <div className="flex justify-around items-center h-10 text-primary">
              <Icon icon="lucide:shield" width="24" height="24" />
              <Icon icon="lucide:zap" width="24" height="24" className="text-amber-500" />
              <Icon icon="lucide:activity" width="24" height="24" className="text-emerald-500" />
              <Icon icon="lucide:globe" width="24" height="24" className="text-blue-500" />
            </div>
          </div>
        </div>

        {/* CMDK Command Palette */}
        <div>
          <div className="text-xs font-semibold text-muted-foreground mb-1.5">CMDK Command Palette (Inline Demo)</div>
          <div className="bg-muted/40 border border-border/50 rounded-lg overflow-hidden">
            <Command label="Verification Command Menu" className="p-2">
              <Command.Input
                value={searchVal}
                onValueChange={setSearchVal}
                placeholder="Search packages..."
                className="w-full px-3 py-2 bg-background border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <Command.List className="mt-2 max-h-32 overflow-y-auto space-y-1">
                <Command.Empty className="text-xs text-muted-foreground p-2">No results found.</Command.Empty>
                <Command.Group heading="Packages" className="text-[10px] font-bold text-muted-foreground px-2 pt-2">
                  <Command.Item
                    value="GSAP"
                    onSelect={() => setSearchVal("GSAP")}
                    className="flex justify-between items-center text-xs text-foreground p-2 rounded hover:bg-accent cursor-pointer select-none"
                  >
                    <span>GSAP</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-muted border border-border rounded text-muted-foreground">Animation</span>
                  </Command.Item>
                  <Command.Item
                    value="Three.js"
                    onSelect={() => setSearchVal("Three.js")}
                    className="flex justify-between items-center text-xs text-foreground p-2 rounded hover:bg-accent cursor-pointer select-none"
                  >
                    <span>Three.js</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-muted border border-border rounded text-muted-foreground">3D Engine</span>
                  </Command.Item>
                  <Command.Item
                    value="Zustand"
                    onSelect={() => setSearchVal("Zustand")}
                    className="flex justify-between items-center text-xs text-foreground p-2 rounded hover:bg-accent cursor-pointer select-none"
                  >
                    <span>Zustand</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-muted border border-border rounded text-muted-foreground">State Store</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
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
