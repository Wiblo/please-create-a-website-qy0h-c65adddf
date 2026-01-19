import { businessInfo } from '@/lib/data/business-info'

// Type for JSON-LD objects
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonLd = Record<string, any>

/**
 * Local Business Schema
 * Place in root layout for site-wide organization data
 * Business types are configured in businessInfo.schemaTypes
 */
export function generateLocalBusinessSchema(): JsonLd {
  const schema: JsonLd = {
    '@context': 'https://schema.org',
    '@type': businessInfo.schemaTypes,
    '@id': `${businessInfo.url}/#organization`,
    name: businessInfo.name,
    url: businessInfo.url,
  }

  // Add description if available
  if (businessInfo.description) {
    schema.description = businessInfo.description
  }

  // Add contact info if available
  if (businessInfo.phone) {
    schema.telephone = businessInfo.phone
  }
  if (businessInfo.email) {
    schema.email = businessInfo.email
  }

  // Add address (required for LocalBusiness)
  if (businessInfo.address) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.address.street,
      addressLocality: businessInfo.address.city,
      addressRegion: businessInfo.address.state,
      postalCode: businessInfo.address.zip,
      addressCountry: businessInfo.address.country,
    }
  }

  // Add geo coordinates if available
  if (businessInfo.geo?.latitude && businessInfo.geo?.longitude) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: businessInfo.geo.latitude,
      longitude: businessInfo.geo.longitude,
    }
  }

  // Add opening hours if available
  if (businessInfo.hours && Object.keys(businessInfo.hours).length > 0) {
    schema.openingHoursSpecification = Object.entries(businessInfo.hours)
      .map(([day, hours]) => {
        // Skip if no hours for this day
        if (!hours || hours === 'Closed') return null

        // Parse "9:00 AM - 5:00 PM" format
        const [opens, closes] = hours.split(' - ')
        if (!opens || !closes) return null

        return {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
          opens: opens.trim(),
          closes: closes.trim(),
        }
      })
      .filter(Boolean) // Remove null entries
  }

  // Add social media profiles if available
  const socialLinks = businessInfo.social
    ? Object.values(businessInfo.social).filter(Boolean)
    : []
  if (socialLinks.length > 0) {
    schema.sameAs = socialLinks
  }

  // Add price range if available
  if (businessInfo.priceRange) {
    schema.priceRange = businessInfo.priceRange
  }

  // Add logo if available
  if (businessInfo.logo) {
    schema.image = `${businessInfo.url}${businessInfo.logo}`
  }

  return schema
}

/**
 * Blog Posting Schema
 * Use on individual blog post pages
 */
export function generateBlogPostingSchema(post: {
  slug: string
  title: string
  description?: string
  date: string
  dateModified?: string
  author: string
  image?: string
}): JsonLd {
  const schema: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${businessInfo.url}/blog/${post.slug}`,
    headline: post.title,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${businessInfo.url}/#organization`,
      name: businessInfo.name,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${businessInfo.url}/blog/${post.slug}`,
    },
  }

  // Add optional fields if available
  if (post.description) {
    schema.description = post.description
  }

  if (post.image) {
    schema.image = post.image
  }

  if (post.dateModified) {
    schema.dateModified = post.dateModified
  }

  // Add publisher logo if available
  if (businessInfo.logo) {
    schema.publisher.logo = {
      '@type': 'ImageObject',
      url: `${businessInfo.url}${businessInfo.logo}`,
    }
  }

  return schema
}

/**
 * FAQ Page Schema
 * Use on pages with FAQ sections
 */
export function generateFAQPageSchema(
  faqs: Array<{ question: string; answer: string }>
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Person Schema (for team members)
 * Use on about/team pages
 */
export function generatePersonSchema(person: {
  name: string
  title: string
  bio?: string
  image?: string
  email?: string
  phone?: string
}): JsonLd {
  const schema: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.title,
    worksFor: {
      '@type': 'Organization',
      '@id': `${businessInfo.url}/#organization`,
      name: businessInfo.name,
    },
  }

  // Add optional fields
  if (person.bio) {
    schema.description = person.bio
  }
  if (person.image) {
    schema.image = person.image
  }
  if (person.email) {
    schema.email = person.email
  }
  if (person.phone) {
    schema.telephone = person.phone
  }

  return schema
}

/**
 * Service Schema
 * Use on service pages
 */
export function generateServiceSchema(service: {
  name: string
  description: string
  url?: string
  provider?: string
  serviceType?: string
  areaServed?: string
  image?: string
  offers?: {
    price: string
    priceCurrency?: string
  }
}): JsonLd {
  const schema: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      '@id': `${businessInfo.url}/#organization`,
      name: service.provider || businessInfo.name,
    },
  }

  // Add URL if provided
  if (service.url) {
    schema.url = service.url
  }

  // Add optional fields
  if (service.serviceType) {
    schema.serviceType = service.serviceType
  }
  if (service.areaServed) {
    schema.areaServed = service.areaServed
  }
  if (service.image) {
    schema.image = service.image
  }

  // Add pricing information
  if (service.offers) {
    schema.offers = {
      '@type': 'Offer',
      price: service.offers.price,
      priceCurrency: service.offers.priceCurrency || 'ZAR',
    }
  }

  return schema
}

/**
 * Review/Testimonial Schema
 * Use on testimonial sections or review pages
 */
export function generateReviewSchema(review: {
  author: string
  rating: number
  reviewBody: string
  datePublished?: string
}): JsonLd {
  const schema: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: review.reviewBody,
    itemReviewed: {
      '@type': 'LocalBusiness',
      '@id': `${businessInfo.url}/#organization`,
      name: businessInfo.name,
    },
  }

  // Add date if available
  if (review.datePublished) {
    schema.datePublished = review.datePublished
  }

  return schema
}

/**
 * Aggregate Rating Schema
 * Use when displaying overall ratings from multiple reviews
 */
export function generateAggregateRatingSchema(
  ratingValue: number,
  reviewCount: number
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${businessInfo.url}/#organization`,
    name: businessInfo.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  }
}

/**
 * Breadcrumb List Schema
 * Use on all pages to show navigation hierarchy
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

/**
 * Component to safely render JSON-LD script tag
 * Usage: <JsonLd data={generateLocalBusinessSchema()} />
 */
export function JsonLd({ data }: { data: JsonLd }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
