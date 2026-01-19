"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/Container"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { getAllServices } from "@/lib/data/services"

export interface TreatmentsOverviewSectionProps {
  className?: string
}

/**
 * Treatments overview section with clickable cards
 * Shows all services as cards that link to individual treatment pages
 * Content is pulled from lib/data/services.ts
 */
export function TreatmentsOverviewSection({ className }: TreatmentsOverviewSectionProps) {
  // Get services and omit icon field (which contains React components that can't be serialized)
  const treatments = getAllServices().map(({ icon: _icon, ...service }) => service)

  return (
    <SectionWrapper className={cn("bg-background", className)}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((treatment) => (
            <Link
              key={treatment.id}
              href={`/treatments/${treatment.slug}`}
              className="group flex flex-col h-full overflow-hidden rounded-4xl border border-border bg-card transition-all hover:shadow-xl hover:border-primary/50"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={treatment.image}
                  alt={treatment.imageAlt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 gap-4 p-6">
                {/* Title */}
                <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {treatment.name}
                </h3>

                {/* Description - truncated with line clamp */}
                <p className="text-muted-foreground leading-relaxed text-sm line-clamp-3 flex-1">
                  {treatment.description}
                </p>

                {/* Learn More Button */}
                <div className="flex items-center gap-2 text-sm font-medium text-primary pt-2">
                  <span>Learn More</span>
                  <span className="relative inline-block h-4 w-4">
                    <ChevronRight className="absolute left-0 top-0 h-4 w-4 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-0" />
                    <ArrowRight className="absolute left-0 top-0 h-4 w-4 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
