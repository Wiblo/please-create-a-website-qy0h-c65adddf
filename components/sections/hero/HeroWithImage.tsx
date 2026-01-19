"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface HeroWithImageProps {
  subtitle?: string
  title: string
  backgroundImage: string
  backgroundImageAlt: string
  ctaText?: string
  ctaUrl?: string
  overlayOpacity?: number
  size?: "large" | "medium" | "small"
  className?: string
}

/**
 * Hero section with full-width background image and centered content
 * Uses wrapper pattern to create inset/rounded effect
 */
export function HeroWithImage({
  subtitle,
  title,
  backgroundImage,
  backgroundImageAlt,
  ctaText,
  ctaUrl,
  overlayOpacity = 20,
  size = "large",
  className,
}: HeroWithImageProps) {
  const sizeClasses = {
    large:
      "flex mt-4 max-h-188 min-h-125 max-w-7xl xl:max-w-none 2xl:px-48 flex-col items-center p-2 pt-0 md:min-h-160 md:h-[calc(100vh-136px)] xl:h-[calc(110vh-136px)]",
    medium:
      "flex mt-4 max-h-140 min-h-100 max-w-7xl xl:max-w-none 2xl:px-48 flex-col items-center p-2 pt-0 md:min-h-120 xl:h-[calc(110vh-136px)]",
    small:
      "flex mt-4 max-h-100 min-h-80 max-w-7xl xl:max-w-none 2xl:px-48 flex-col items-center p-2 pt-0 md:min-h-80 xl:h-[calc(110vh-136px)]",
  }

  return (
    <main className={cn(sizeClasses[size], className)}>
      <div className="relative flex w-full flex-1 flex-col overflow-hidden rounded-4xl bg-black">
        {/* Background Image */}
        {backgroundImage && (
          <div className="absolute h-full w-full overflow-hidden rounded-4xl">
            <Image
              src={backgroundImage}
              alt={backgroundImageAlt}
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        )}

        {/* Content */}
        <div className="relative flex h-full flex-1 flex-col justify-end gap-8 p-8 pt-52 lg:p-20 lg:pb-20">
          <div className="max-w-200 bg-transparent">
            <div className="flex flex-col gap-6 text-balance">
              {subtitle && (
                <h1 className="text-white">
                  <span className="border-l-4 border-primary pl-4 text-lg font-medium md:text-xl">
                    {subtitle}
                  </span>
                </h1>
              )}

              <span
                className="font-heading text-3xl leading-tight text-white md:text-4xl lg:text-5xl"
                style={{ fontWeight: 700 }}
              >
                {title}
              </span>
            </div>
          </div>

          {/* CTA Button */}
          {ctaText && ctaUrl && (
            <div className="flex">
              <div className="xs:flex-row flex flex-col gap-2 sm:flex-row">
                <Link
                  href={ctaUrl}
                  className="group relative flex min-h-12 items-center justify-center rounded-lg bg-primary px-6 py-3 font-medium text-white transition-all ease-in-out hover:rounded-xl hover:bg-primary-hover"
                >
                  <span className="flex flex-1 items-center justify-center gap-x-2">
                    <span className="flex flex-row items-center gap-x-[4px]">
                      {ctaText}
                      <span className="relative inline-block h-4 w-4">
                        <ChevronRight className="absolute left-0 top-0 h-4 w-4 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-0" />
                        <ArrowRight className="absolute left-0 top-0 h-4 w-4 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                      </span>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
