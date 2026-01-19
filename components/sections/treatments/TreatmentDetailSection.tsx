"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/Container"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import type { Service } from "@/lib/data/services"

// Type without icon for serialization across server/client boundary
type TreatmentData = Omit<Service, "icon">

export interface TreatmentDetailSectionProps {
  treatment: TreatmentData
  className?: string
}

/**
 * Treatment detail section for individual treatment pages
 * Displays full information about a specific treatment
 * Accepts treatment data as prop (pulled from services.ts via page)
 */
export function TreatmentDetailSection({
  treatment,
  className,
}: TreatmentDetailSectionProps) {
  return (
    <SectionWrapper className={cn("bg-background", className)}>
      <Container>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          {/* Image */}
          <div className="w-full md:w-5/12">
            <div className="relative aspect-[3/4] rounded-4xl overflow-hidden shadow-xl">
              <Image
                src={treatment.image}
                alt={treatment.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-7/12">
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
              {treatment.name}
            </h1>

            {treatment.shortDescription && (
              <p className="text-xl text-primary font-medium mb-6">
                {treatment.shortDescription}
              </p>
            )}

            {treatment.fullDescription && (
              <div className="prose prose-gray max-w-none mb-8">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {treatment.fullDescription}
                </p>
              </div>
            )}

            {/* Duration & Price */}
            <div className="flex gap-6 mb-8">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Duration</p>
                <p className="text-lg font-semibold text-foreground">
                  {treatment.duration}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Price</p>
                <p className="text-lg font-semibold text-foreground">
                  {treatment.price}
                </p>
              </div>
            </div>

            {/* Benefits */}
            {treatment.benefits && treatment.benefits.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Clinical Benefits:
                </h3>
                <div className="space-y-2">
                  {treatment.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ideal For */}
            {treatment.idealFor && treatment.idealFor.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Indicated For:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {treatment.idealFor.map((condition, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary/10 text-muted-foreground rounded-full text-sm"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <Link
              href="https://sticksandstoneswellnesshub.pencilmein.online/Booking"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors font-medium"
            >
              Book This Treatment
              <span className="relative inline-block h-4 w-4">
                <ChevronRight className="absolute left-0 top-0 h-4 w-4 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-0" />
                <ArrowRight className="absolute left-0 top-0 h-4 w-4 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
