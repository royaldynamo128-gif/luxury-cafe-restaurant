"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FaqItemProps {
  question: string
  answer: string
}

function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border-b border-border py-4 transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left font-medium text-lg py-2 focus:outline-none"
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground text-sm py-2 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface FaqSectionProps {
  faqs: FaqItemProps[]
}

export function FaqSection({ faqs }: FaqSectionProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
      {faqs.map((faq, idx) => (
        <FaqItem key={idx} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  )
}
