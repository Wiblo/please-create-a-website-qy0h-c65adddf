"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/Container"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { getAllFaqs } from "@/lib/data/faqs"
import type { FaqItem } from "@/lib/data/faqs"
import { businessInfo, getPhoneLink, getEmailLink } from "@/lib/data/business-info"

export interface FaqSectionProps {
  title?: string
  subtitle?: string
  items?: FaqItem[]
  className?: string
}

/**
 * FAQ section with accordion-style questions and answers
 * Includes contact CTA at the bottom for additional questions
 */
export function FaqSection({
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about chiropractic care and what to expect at our practice",
  items,
  className,
}: FaqSectionProps) {
  const faqs = items || getAllFaqs()
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <SectionWrapper className={cn("bg-background", className)}>
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Section Header */}
          <div className="mb-12 text-center md:text-left">
            <h2 className="font-heading mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              {title}
            </h2>
            {subtitle && (
              <p className="max-w-3xl text-lg text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>

          {/* FAQ Accordion List */}
          <div className="divide-y divide-border border-t border-border">
            {faqs.map((item) => {
              const isOpen = openItems.has(item.id)

              return (
                <div key={item.id} className="group">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-primary"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <span className="text-base font-medium text-foreground group-hover:text-primary md:text-lg">
                      {item.question}
                    </span>
                    <div
                      className={cn(
                        "ml-4 flex-shrink-0 transition-all duration-200",
                        isOpen ? "rotate-180 text-primary" : "text-muted-foreground"
                      )}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </button>

                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}
                    id={`faq-answer-${item.id}`}
                  >
                    <div className="pb-6 pr-12">
                      <p className="text-base leading-relaxed text-muted-foreground">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Contact CTA Card */}
          <div className="mt-12 rounded-2xl bg-secondary/10 p-8 text-center">
            <h3 className="font-heading mb-2 text-xl font-semibold text-foreground">
              Still have questions?
            </h3>
            <p className="mb-6 text-muted-foreground">
              We&apos;re here to help. Contact us for personalized assistance.
            </p>
            <div className="flex flex-col gap-4 justify-center sm:flex-row">
              <a
                href={getPhoneLink()}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                Call Us: {businessInfo.phone}
              </a>
              <a
                href={getEmailLink()}
                className="inline-flex items-center justify-center rounded-lg border border-primary px-6 py-3 font-medium text-primary transition-colors hover:bg-secondary/20"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
