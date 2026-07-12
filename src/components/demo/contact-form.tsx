"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters")
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(contactSchema as any)
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Form submitted successfully:", data)
    setIsSubmitting(false)
    setIsSuccess(true)
    reset()
    setTimeout(() => setIsSuccess(false), 5000)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto p-6 bg-card rounded-2xl border border-border shadow-xl relative overflow-hidden">
      {isSuccess && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/95 z-10 transition-all p-6 text-center">
          <h4 className="text-xl font-semibold text-primary mb-2">Message Sent!</h4>
          <p className="text-muted-foreground text-sm">Thank you for reaching out. We will get back to you within 24 hours.</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1.5">Name</label>
        <input
          id="name"
          type="text"
          {...register("name")}
          placeholder="John Doe"
          className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
        <input
          id="email"
          type="email"
          {...register("email")}
          placeholder="john@example.com"
          className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-1.5">Company <span className="text-muted-foreground text-xs">(Optional)</span></label>
        <input
          id="company"
          type="text"
          {...register("company")}
          placeholder="Acme Inc."
          className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1.5">Message</label>
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          placeholder="Tell us about your project..."
          className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
        {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full py-6 flex items-center justify-center gap-2 cursor-pointer">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending message...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  )
}
