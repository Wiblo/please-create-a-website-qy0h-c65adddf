import type { Metadata } from "next"
import { AboutFullSection } from "@/components/sections/about/AboutFullSection"
import { FeaturesSection } from "@/components/sections/features/FeaturesSection"
import { GallerySection } from "@/components/sections/gallery/GallerySection"
import { generatePageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = generatePageMetadata(
  "About Us",
  "Learn more about Dr. Kamilah Jordaan and our commitment to providing exceptional chiropractic care for sports and family wellness.",
  "/about"
)

export default function AboutPage() {
  return (
    <>
      <AboutFullSection />
      <FeaturesSection />
      <GallerySection />
    </>
  )
}
