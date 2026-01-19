"use client"

import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/Container"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { getFeaturedServices } from "@/lib/data/services"
import type { Service } from "@/lib/data/services"

export interface FeaturedServicesProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaUrl?: string
  className?: string
}

/**
 * Truncated description component with read more/less functionality
 */
function TruncatedDescription({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        setIsTruncated(
          textRef.current.scrollHeight > textRef.current.clientHeight
        )
      }
    }

    checkTruncation()
    window.addEventListener("resize", checkTruncation)
    return () => window.removeEventListener("resize", checkTruncation)
  }, [text])

  return (
    <div className="mb-4">
      <p
        ref={textRef}
        className={cn(
          "text-sm text-muted-foreground transition-all duration-300",
          !isExpanded && "line-clamp-3"
        )}
      >
        {text}
      </p>
      {isTruncated && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
          type="button"
        >
          {isExpanded ? (
            <>
              Show less
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Read more
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      )}
    </div>
  )
}

/**
 * Service card component
 */
function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon

  return (
    <div className="group h-full overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      {/* Image */}
      <div className="relative h-56 w-full flex-shrink-0 overflow-hidden bg-muted">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col p-5">
        {/* Icon & Title */}
        <div className="mb-3 flex items-start gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading text-lg font-semibold text-foreground">
              {service.name}
            </h3>
            <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
              <span>{service.duration}</span>
              <span>•</span>
              <span className="font-medium text-primary">{service.price}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <TruncatedDescription text={service.description} />

        {/* Benefits */}
        {service.benefits && service.benefits.length > 0 && (
          <ul className="mb-4 space-y-1">
            {service.benefits.map((benefit, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <ChevronRight className="h-3 w-3 flex-shrink-0 text-primary" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CTA Button */}
        <div className="mt-auto border-t border-border pt-4">
          <Link
            href={service.slug ? `/services/${service.slug}` : '#'}
            className="group/btn flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Learn More
            <span className="relative inline-block h-4 w-4">
              <ChevronRight className="absolute left-0 top-0 h-4 w-4 transition-all duration-200 group-hover/btn:translate-x-1 group-hover/btn:opacity-0" />
              <ArrowRight className="absolute left-0 top-0 h-4 w-4 -translate-x-1 opacity-0 transition-all duration-200 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

/**
 * Featured Services section component
 * Displays featured services from the services data file
 */
export function FeaturedServices({
  title = "Consultation Services",
  subtitle = "Comprehensive chiropractic care tailored to your stage of healing",
  ctaText = "Learn More About Our Treatments",
  ctaUrl = "/services",
  className,
}: FeaturedServicesProps) {
  const featuredServices = getFeaturedServices()

  return (
    <SectionWrapper className={cn("bg-background", className)}>
      <Container>
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="font-heading mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        {/* Services Grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* View All Services CTA */}
        {ctaText && ctaUrl && (
          <div className="mt-12 text-center">
            <Link
              href={ctaUrl}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-all hover:bg-primary-hover"
            >
              {ctaText}
              <span className="relative inline-block h-4 w-4">
                <ChevronRight className="absolute left-0 top-0 h-4 w-4 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-0" />
                <ArrowRight className="absolute left-0 top-0 h-4 w-4 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              </span>
            </Link>
          </div>
        )}
      </Container>
    </SectionWrapper>
  )
}
