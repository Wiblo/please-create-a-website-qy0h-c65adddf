import type { Metadata } from "next"
import { HeroWithImage } from "@/components/sections/hero/HeroWithImage"
import { TreatmentsOverviewSection } from "@/components/sections/treatments/TreatmentsOverviewSection"
import { generatePageMetadata } from "@/lib/seo/metadata"
import { businessInfo } from "@/lib/data/business-info"

export const metadata: Metadata = generatePageMetadata(
  "Treatments & Services",
  "Explore our comprehensive range of chiropractic treatments and services designed to help you achieve optimal health and wellness.",
  "/treatments"
)

export default function TreatmentsPage() {
  return (
    <>
      <HeroWithImage
        subtitle="Professional Chiropractic Care"
        title="Our Treatments & Services"
        backgroundImage="/treatment-room-hero.jpeg"
        backgroundImageAlt="Professional chiropractic treatment facility"
        ctaText="Book Your Appointment"
        ctaUrl={businessInfo.bookingUrl}
        size="medium"
      />
      <TreatmentsOverviewSection />
    </>
  )
}
