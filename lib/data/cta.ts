export interface CTAContent {
  title: string
  description: string
  ctaText: string
  ctaUrl: string
  backgroundImage: string
  backgroundImageAlt: string
}

/**
 * CTA (Call-to-Action) section content
 * Update this to modify the CTA section shown on the homepage
 */
export const ctaContent: CTAContent = {
  title: 'Ready to Start Your Healing Journey?',
  description:
    'Experience comprehensive chiropractic care tailored to your unique needs. Dr. Kamilah Jordaan is here to help you achieve optimal health and wellness.',
  ctaText: 'Book Your Appointment',
  ctaUrl: 'https://sticksandstoneswellnesshub.pencilmein.online/Booking',
  backgroundImage: '/cta-background.jpeg',
  backgroundImageAlt: 'Professional chiropractic treatment room',
}
