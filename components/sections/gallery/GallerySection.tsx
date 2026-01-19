"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/Container"
import { SectionWrapper } from "@/components/layout/SectionWrapper"
import { galleryContent } from "@/lib/data/gallery"

export interface GallerySectionProps {
  columns?: 2 | 3 | 4
  showPlaceholder?: boolean
  className?: string
}

/**
 * Gallery section displaying practice images in a responsive grid
 * Content is pulled from lib/data/gallery.ts
 */
export function GallerySection({
  columns = 3,
  showPlaceholder = true,
  className,
}: GallerySectionProps) {
  const { title, subtitle, items } = galleryContent

  const gridCols =
    {
      2: "grid-cols-2",
      3: "grid-cols-2 md:grid-cols-3",
      4: "grid-cols-2 md:grid-cols-4",
    }[columns] || "grid-cols-2 md:grid-cols-3"

  return (
    <SectionWrapper className={cn("bg-background", className)}>
      <Container>
        <div className="flex flex-col gap-12 md:gap-16">
          {/* Section Header */}
          <div className="mx-auto">
            <div className="flex flex-col self-stretch text-balance text-center md:max-w-2xl md:self-center">
              <div className="flex flex-col gap-2 md:gap-4">
                <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-base font-medium text-muted-foreground">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className={cn("grid gap-2 md:gap-4", gridCols)}>
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative flex aspect-square overflow-visible"
              >
                <div className="absolute inset-0 overflow-hidden rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-lg">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes={
                      columns === 4
                        ? "(max-width: 768px) 50vw, 25vw"
                        : columns === 3
                          ? "(max-width: 768px) 50vw, 33vw"
                          : "50vw"
                    }
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 rounded-xl bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </div>
            ))}

            {/* Empty placeholder for maintaining grid layout when needed */}
            {showPlaceholder && columns === 3 && items.length === 5 && (
              <div className="relative hidden aspect-square overflow-visible md:block">
                <div className="absolute inset-0 overflow-hidden rounded-xl bg-muted" />
              </div>
            )}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
