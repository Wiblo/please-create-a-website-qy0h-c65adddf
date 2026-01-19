import { Activity, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Service {
  id: string
  slug: string
  name: string
  description: string
  duration: string
  price: string
  image: string
  imageAlt: string
  icon: LucideIcon
  benefits?: string[]
  featured?: boolean
  // Full treatment details for dedicated pages
  shortDescription?: string
  fullDescription?: string
  idealFor?: string[]
}

/**
 * All services offered by the practice
 * Update this array to add/modify services shown throughout the site
 */
export const services: Service[] = [
  {
    id: 'initial-consultation',
    slug: 'initial-consultation',
    name: 'Initial Consultation',
    description:
      'Comprehensive first visit including thorough history taking, physical examination, and personalised treatment plan development to address your specific health concerns.',
    duration: '60 min',
    price: 'R850',
    image: '/arm-mobility-assessment.jpeg',
    imageAlt: 'Professional arm mobility assessment during consultation',
    icon: Activity,
    benefits: [
      'Complete health assessment',
      'Diagnosis and explanation',
      'Personalised treatment plan',
      'First adjustment if suitable',
    ],
    featured: true,
    shortDescription:
      'Your journey to optimal health begins with a comprehensive assessment',
    fullDescription:
      'During your initial consultation, Dr. Jordaan conducts a thorough evaluation of your health history, current concerns, and wellness goals. This includes a detailed physical examination, postural analysis, and functional movement assessment.\n\nUsing evidence-based diagnostic techniques, we identify the root cause of your discomfort and develop a personalized treatment plan tailored to your unique needs. If appropriate, your first chiropractic adjustment may be performed during this visit.',
    idealFor: [
      'New patients',
      'Chronic pain',
      'Sports injuries',
      'Postural issues',
      'Preventative care',
      'Wellness optimization',
    ],
  },
  {
    id: 'follow-up',
    slug: 'follow-up-consultation',
    name: 'Follow-Up Consultation',
    description:
      'Continued care appointments to monitor progress, adjust treatment plans, and provide therapeutic interventions tailored to your healing journey.',
    duration: '30 min',
    price: 'R650',
    image: '/spinal-adjustment-treatment.jpeg',
    imageAlt: 'Professional spinal adjustment treatment session',
    icon: Zap,
    benefits: [
      'Progress evaluation',
      'Treatment adjustments',
      'Therapeutic interventions',
      'Home care advice',
    ],
    featured: true,
    shortDescription:
      'Ongoing care to maintain progress and achieve your health goals',
    fullDescription:
      'Follow-up consultations are essential for monitoring your progress and ensuring optimal results. Each session includes a reassessment of your condition, targeted chiropractic adjustments, and complementary therapies as needed.\n\nDr. Jordaan adjusts your treatment plan based on your response to care, ensuring you continue progressing toward your health goals. These appointments also include guidance on exercises, lifestyle modifications, and self-care strategies to support your healing between visits.',
    idealFor: [
      'Ongoing treatment',
      'Maintenance care',
      'Recovery monitoring',
      'Pain management',
      'Performance optimization',
    ],
  },
]

/**
 * Get all services
 */
export function getAllServices(): Service[] {
  return services
}

/**
 * Get featured services only
 */
export function getFeaturedServices(): Service[] {
  return services.filter((service) => service.featured)
}

/**
 * Get a single service by slug
 */
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

/**
 * Get a single service by ID
 */
export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id)
}
