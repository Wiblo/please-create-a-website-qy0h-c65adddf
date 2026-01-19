"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, ArrowRight, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/Container"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import {
  businessInfo,
  getGoogleMapsEmbedUrl,
  getGoogleMapsDirectionsUrl,
  getPhoneLink,
  getEmailLink,
} from "@/lib/data/business-info"

export interface LocationSectionProps {
  title?: string
  bookingText?: string
  className?: string
}

/**
 * Location section with Google Maps embed and business details
 * Displays map, address, contact info, hours, and open/closed status
 */
export function LocationSection({
  title = "Find Us",
  bookingText = "Book Now",
  className,
}: LocationSectionProps) {
  const [showHours, setShowHours] = useState(false)
  const [status, setStatus] = useState<{ isOpen: boolean; message: string } | null>(null)

  const mapEmbedUrl = getGoogleMapsEmbedUrl()
  const directionsUrl = getGoogleMapsDirectionsUrl()

  const toggleHours = () => {
    setShowHours(!showHours)
  }

  // Check if currently open (using South African timezone)
  const getCurrentStatus = () => {
    try {
      const now = new Date()

      // Get the day of week in SA timezone
      const saWeekday = now
        .toLocaleDateString("en-US", {
          timeZone: "Africa/Johannesburg",
          weekday: "long",
        })
        .toLowerCase()

      // Get the time in SA timezone
      const saTime = now.toLocaleTimeString("en-US", {
        timeZone: "Africa/Johannesburg",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      })

      // Parse time
      const [hours, minutes] = saTime.split(":").map(Number)
      const currentDay = saWeekday
      const currentTime = hours + minutes / 60 // Convert to decimal hours

      const todayHours =
        businessInfo.hours[currentDay as keyof typeof businessInfo.hours]

      if (todayHours === "Closed") {
        return { isOpen: false, message: "Closed" }
      }

      // Check operating hours based on South African time
      if (currentDay === "tuesday" || currentDay === "thursday") {
        if (currentTime >= 7 && currentTime < 15.5) {
          // 7:00am - 3:30pm
          return { isOpen: true, message: "Open now" }
        }
      } else if (currentDay === "monday" || currentDay === "wednesday") {
        if (currentTime >= 9 && currentTime < 18) {
          // 9:00am - 6:00pm
          return { isOpen: true, message: "Open now" }
        }
      } else if (currentDay === "friday") {
        if (currentTime >= 8 && currentTime < 16) {
          // 8:00am - 4:00pm
          return { isOpen: true, message: "Open now" }
        }
      } else if (currentDay === "saturday") {
        if (currentTime >= 8 && currentTime < 12) {
          // 8:00am - 12:00pm
          return { isOpen: true, message: "Open now" }
        }
      }

      return { isOpen: false, message: "Closed" }
    } catch {
      // Silently fallback to closed status if there's an error
      return { isOpen: false, message: "Closed" }
    }
  }

  // Run status check only on client side to avoid hydration mismatch
  useEffect(() => {
    // Set initial status
    const initialStatus = getCurrentStatus()
    setStatus(initialStatus)

    // Update status every minute
    const interval = setInterval(() => {
      const newStatus = getCurrentStatus()
      setStatus(newStatus)
    }, 60000)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SectionWrapper className={cn("bg-background", className)}>
      <Container>
        {/* Section Header */}
        <div className="mb-12 flex w-full items-center justify-center md:justify-between">
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            {title}
          </h2>
        </div>

        {/* Map and Info Card */}
        <div className="overflow-hidden rounded-4xl bg-secondary/10 p-2">
          <div className="flex w-full flex-col gap-2 lg:flex-row">
            {/* Google Maps Embed */}
            <div className="h-[300px] w-full shrink-0 overflow-hidden rounded-4xl bg-transparent lg:h-[390px] lg:w-[450px]">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${businessInfo.maps.locationName} Location`}
                className="rounded-4xl"
              />
            </div>

            {/* Location Details */}
            <div className="h-[390px] w-full flex-1">
              <div className="flex h-full w-full flex-col justify-between gap-8 px-6 py-6">
                {/* Location Name and Directions Button (only shown when hours hidden) */}
                {!showHours && (
                  <div className="relative flex w-full items-start justify-between bg-transparent">
                    <div className="flex flex-col gap-1">
                      {businessInfo.address.area && (
                        <span className="font-heading text-xl font-bold text-foreground md:text-2xl lg:text-3xl">
                          {businessInfo.address.area}
                        </span>
                      )}
                      <span className="font-heading text-xl font-bold text-foreground md:text-2xl lg:text-3xl">
                        {businessInfo.address.city}, {businessInfo.address.state}
                      </span>
                    </div>

                    <Link
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex min-h-12 items-center justify-center whitespace-nowrap rounded-lg border border-border px-6 py-3 font-medium text-muted-foreground transition-all hover:rounded-xl hover:bg-secondary/20"
                      aria-label="Get Directions"
                    >
                      <span className="flex flex-1 items-center justify-center gap-x-2">
                        <span className="flex flex-row items-center gap-x-[4px]">
                          Get Directions
                          <span className="h-fit w-fit opacity-50 transition-opacity group-hover:opacity-100">
                            <ChevronRight className="h-4 w-4 translate-x-[-3px] scale-[1.15] transition-transform group-hover:translate-x-0" />
                          </span>
                        </span>
                      </span>
                    </Link>
                  </div>
                )}

                {/* Address and Contact Info (only shown when hours hidden) */}
                {!showHours ? (
                  <div className="flex flex-row gap-6 sm:gap-20">
                    <Link
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-primary"
                    >
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Address
                        </p>
                        <address className="flex flex-col gap-[2px] not-italic">
                          <p className="text-sm font-medium text-foreground">
                            {businessInfo.address.street}
                          </p>
                          {businessInfo.address.area && (
                            <p className="text-sm font-medium text-foreground">
                              {businessInfo.address.area}
                            </p>
                          )}
                          <p className="text-sm font-medium text-foreground">
                            {businessInfo.address.city}, {businessInfo.address.state}{" "}
                            {businessInfo.address.zip}
                          </p>
                        </address>
                      </div>
                    </Link>

                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Contact
                      </p>
                      <div className="flex flex-col gap-[2px]">
                        <Link
                          href={getPhoneLink()}
                          className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                        >
                          {businessInfo.phone}
                        </Link>
                        {businessInfo.phoneSecondary && (
                          <Link
                            href={getPhoneLink(businessInfo.phoneSecondary)}
                            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                          >
                            {businessInfo.phoneSecondary}
                          </Link>
                        )}
                        <Link
                          href={getEmailLink()}
                          className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                        >
                          {businessInfo.email}
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Office Hours Grid (only shown when hours visible) */
                  <div className="flex flex-1 flex-col gap-4">
                    <div className="grid grid-cols-[min-content_1fr] gap-x-8 gap-y-2">
                      {Object.entries(businessInfo.hours).map(([day, time]) => (
                        <div key={day} className="contents">
                          <p className="whitespace-nowrap text-sm font-medium text-muted-foreground capitalize">
                            {day}
                          </p>
                          <p className="text-sm font-medium text-foreground">
                            {time}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Section: Status, Toggle, and Booking CTA */}
                <div className="flex flex-col gap-4">
                  <hr className="h-px border-0 border-t border-transparent bg-border" />

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Status and Hours Toggle */}
                    <div className="flex items-center gap-4">
                      {status && (
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "h-2 w-2 rounded-full",
                              status.isOpen ? "bg-green-500" : "bg-red-500"
                            )}
                          />
                          <span className="text-sm font-medium text-foreground">
                            {status.message}
                          </span>
                        </div>
                      )}

                      <button
                        onClick={toggleHours}
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <span>{showHours ? "See info" : "See hours"}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            showHours && "rotate-180"
                          )}
                        />
                      </button>
                    </div>

                    {/* Booking CTA */}
                    {businessInfo.bookingUrl && (
                      <Link
                        href={businessInfo.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex min-h-12 items-center justify-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all ease-in-out hover:rounded-xl hover:bg-primary-hover"
                      >
                        <span className="flex flex-1 items-center justify-center gap-x-2">
                          <span className="flex flex-row items-center gap-x-[4px]">
                            {bookingText}
                            <span className="relative inline-block h-4 w-4">
                              <ChevronRight className="absolute left-0 top-0 h-4 w-4 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-0" />
                              <ArrowRight className="absolute left-0 top-0 h-4 w-4 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                            </span>
                          </span>
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
