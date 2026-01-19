import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { HeroWithImage } from "@/components/sections/hero/HeroWithImage"
import { TreatmentDetailSection } from "@/components/sections/treatments/TreatmentDetailSection"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import { Container } from "@/components/layout/Container"
import { generatePageMetadata } from "@/lib/seo/metadata"
import { generateServiceSchema, JsonLd } from "@/lib/seo/json-ld"
import { getServiceBySlug } from "@/lib/data/services"
import { businessInfo } from "@/lib/data/business-info"

const treatment = getServiceBySlug("follow-up-consultation")

if (!treatment) {
  notFound()
}

export const metadata: Metadata = generatePageMetadata(
  treatment.name,
  treatment.description,
  `/treatments/${treatment.slug}`
)

export default function FollowUpConsultationPage() {
  if (!treatment) {
    notFound()
  }

  // Omit icon field before passing to client component
  const { icon, ...treatmentData } = treatment

  return (
    <>
      <JsonLd
        data={generateServiceSchema({
          name: treatment.name,
          description: treatment.description,
          url: `${businessInfo.url}/treatments/${treatment.slug}`,
          serviceType: "ChiropracticCare",
          areaServed: "Johannesburg, South Africa",
          image: `${businessInfo.url}${treatment.image}`,
          offers: {
            price: treatment.price.replace("R", ""),
            priceCurrency: "ZAR",
          },
        })}
      />
      <HeroWithImage
        subtitle="Continued Care"
        title={treatment.name}
        backgroundImage={treatment.image}
        backgroundImageAlt={treatment.imageAlt}
        ctaText="Book Your Appointment"
        ctaUrl="https://sticksandstoneswellnesshub.pencilmein.online/Booking"
        size="medium"
      />
      <div className="py-4 border-b border-border">
        <Container>
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Treatments", href: "/treatments" },
              { name: treatment.name },
            ]}
          />
        </Container>
      </div>
      <TreatmentDetailSection treatment={treatmentData} />
    </>
  )
}
