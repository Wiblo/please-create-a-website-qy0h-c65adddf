# Architecture - Chiropractor Website Template

## Project Goals

Create a perfect, production-ready template for chiropractor websites that:
- Achieves perfect Lighthouse scores (100/100/100/100)
- Excellent SEO implementation (JSON-LD, sitemap, robots.txt)
- Uses a component-based architecture for easy customization and development
- Is simple enough for junior engineers to maintain
- Is elegant, performant, and accessible
- Professional design and user experience

## File Structure

```
/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Homepage
│   ├── not-found.tsx            # Custom 404 page
│   ├── about/
│   │   └── page.tsx             # About the practice
│   ├── services/
│   │   ├── page.tsx             # Services overview
│   │   └── [slug]/
│   │       └── page.tsx         # Individual service pages
│   ├── contact/
│   │   └── page.tsx             # Contact page
│   ├── blog/
│   │   ├── page.tsx             # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx         # Individual blog posts
│   ├── sitemap.ts               # Dynamic sitemap generation
│   ├── robots.ts                # Robots.txt configuration
│   └── manifest.ts              # PWA manifest
│
├── components/
│   ├── sections/                # Full-width page sections
│   │   ├── hero/
│   │   │   ├── HeroSimple.tsx
│   │   │   ├── HeroWithImage.tsx
│   │   │   └── HeroWithVideo.tsx
│   │   ├── features/
│   │   │   ├── FeaturesGrid.tsx
│   │   │   └── FeaturesWithIcons.tsx
│   │   ├── services/
│   │   │   ├── ServicesGrid.tsx
│   │   │   └── ServicesCarousel.tsx
│   │   ├── testimonials/
│   │   │   ├── TestimonialsCarousel.tsx
│   │   │   └── TestimonialsGrid.tsx
│   │   ├── team/
│   │   │   ├── TeamGrid.tsx
│   │   │   └── TeamCard.tsx
│   │   ├── cta/
│   │   │   ├── CTASimple.tsx
│   │   │   └── CTAWithImage.tsx
│   │   ├── contact/
│   │   │   ├── ContactForm.tsx
│   │   │   └── ContactInfo.tsx
│   │   ├── faq/
│   │   │   └── FAQAccordion.tsx
│   │   └── footer/
│   │       └── Footer.tsx
│   │
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   ├── Container.tsx        # Max-width wrapper with horizontal padding
│   │   └── SectionWrapper.tsx   # Vertical spacing wrapper for sections
│   │
│   └── ui/                      # shadcn/ui components (already exists)
│
├── lib/
│   ├── utils.ts                 # General utilities (cn, etc.)
│   ├── seo/
│   │   ├── metadata.ts          # Page metadata generators
│   │   ├── json-ld.ts           # JSON-LD structured data schemas
│   │   └── constants.ts         # SEO constants (site-wide defaults)
│   ├── data/
│   │   ├── business-info.ts     # Business details (name, address, phone, hours)
│   │   ├── services.ts          # Services data and fetchers
│   │   ├── team.ts              # Team member data
│   │   └── testimonials.ts      # Testimonial data
│   ├── content/
│   │   └── blog.ts              # Blog post utilities (getBlogPosts, etc.)
│   └── analytics/
│       └── tracking.ts          # Analytics setup (optional)
│
├── content/                     # Content files (MDX, Markdown)
│   ├── services/                # Service definitions
│   │   ├── spinal-adjustment.md
│   │   ├── massage-therapy.md
│   │   └── index.ts
│   └── blog/                    # Blog posts (MDX)
│       ├── posts.json           # Blog metadata (single source of truth)
│       ├── understanding-chiropractic-care.mdx
│       ├── back-pain-relief-tips.mdx
│       └── posture-guide.mdx
│
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── team/
│   │   └── og/                  # Open Graph images
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── manifest-icons/
│
└── types/
    ├── site.ts                  # Site configuration types
    ├── content.ts               # Content types
    └── seo.ts                   # SEO-related types
```

## Component Architecture

### Design Philosophy

**Three-Tier System:**
```
UI Components (shadcn) → Sections → Pages
```

- **UI Components** (`components/ui/`): Shadcn primitives - DO NOT modify
- **Sections** (`components/sections/`): Page building blocks composed from UI components
- **Wrappers** (`components/layout/`): Layout utilities for spacing and constraints
- **Pages** (`app/**/page.tsx`): Composed entirely of sections

### Wrapper Components

**Container** - Provides max-width and horizontal padding:
```tsx
// components/layout/Container.tsx
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('container mx-auto px-4 md:px-6 max-w-7xl', className)}>
      {children}
    </div>
  )
}
```

**SectionWrapper** - Provides consistent vertical spacing between sections:
```tsx
// components/layout/SectionWrapper.tsx
import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
}

export function SectionWrapper({ children, className }: SectionWrapperProps) {
  return (
    <section className={cn('py-16 md:py-24', className)}>
      {children}
    </section>
  )
}
```

**Why Wrappers?**
- Consistent spacing throughout the site
- Easy to adjust spacing globally
- Junior engineers don't need to remember spacing values
- Cleaner, more readable section code

**Usage in Sections:**
```tsx
// components/sections/hero/HeroSimple.tsx
import { Container } from '@/components/layout/Container'
import { SectionWrapper } from '@/components/layout/SectionWrapper'

export function HeroSimple({ title, subtitle }: HeroProps) {
  return (
    <SectionWrapper>
      <Container>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </Container>
    </SectionWrapper>
  )
}
```

### Sections as Building Blocks

Pages are composed entirely of sections:

```tsx
// app/page.tsx
import { HeroWithImage } from '@/components/sections/hero/HeroWithImage'
import { FeaturesGrid } from '@/components/sections/features/FeaturesGrid'
import { ServicesGrid } from '@/components/sections/services/ServicesGrid'
import { TestimonialsCarousel } from '@/components/sections/testimonials/TestimonialsCarousel'
import { CTASimple } from '@/components/sections/cta/CTASimple'

export default function HomePage() {
  return (
    <>
      <HeroWithImage />
      <FeaturesGrid />
      <ServicesGrid />
      <TestimonialsCarousel />
      <CTASimple />
    </>
  )
}
```

**Benefits:**
- Junior engineers build pages like Lego blocks
- Consistent spacing and styling automatically
- Easy to reorder sections
- Sections are reusable across different pages

### Section Props Pattern

All sections should follow a consistent prop pattern:

```tsx
interface SectionProps {
  // Content
  heading?: string
  subheading?: string
  description?: string
  items?: Array<T>

  // Styling
  variant?: 'default' | 'dark' | 'accent'
  className?: string

  // Layout
  columns?: 2 | 3 | 4
  alignment?: 'left' | 'center' | 'right'
}
```

## Performance Strategy

### Image Optimization
- Use Next.js `<Image>` component exclusively
- Implement responsive images with `sizes` prop
- Use WebP/AVIF formats via Next.js automatic optimization
- Lazy load images below the fold
- Provide proper width/height to prevent layout shift

### Font Optimization
- Use `next/font` for Geist fonts (already configured)
- Subset fonts to only required characters if needed
- Preload critical fonts

### JavaScript Optimization
- Use Server Components by default (RSC)
- Only use `"use client"` when absolutely necessary
- Code split by route automatically via Next.js
- Lazy load heavy components with `next/dynamic`

### CSS Optimization
- Use Tailwind CSS for minimal CSS output
- Purge unused styles automatically
- Use CSS variables for theming (already configured)

### Core Web Vitals Targets
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **INP** (Interaction to Next Paint): < 200ms

## SEO Strategy

### Metadata Architecture

**File: `lib/seo/metadata.ts`**
- Export reusable metadata generators
- Include defaults for all pages
- Override per page as needed

```tsx
export function generatePageMetadata(
  title: string,
  description: string,
  path: string,
  image?: string
): Metadata
```

### JSON-LD Structured Data

**Approach: Manual Implementation (No Library)**

We use a **manual JSON-LD implementation** instead of libraries like `next-seo` for:
- Full control over output
- No extra dependencies
- Easier for junior engineers to understand and debug
- Type-safe with TypeScript
- Simple JavaScript objects

**File: `lib/seo/json-ld.ts`**

Complete implementation with safe handling of optional fields:

```tsx
import { businessInfo } from '@/lib/data/business-info'
import type { BlogPost } from '@/lib/content/blog'

// Type for JSON-LD objects
type JsonLd = Record<string, any>

/**
 * Local Business Schema (includes MedicalBusiness for chiropractors)
 * Place in root layout for site-wide organization data
 */
export function generateLocalBusinessSchema(): JsonLd {
  const schema: JsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'MedicalBusiness', 'HealthAndBeautyBusiness'],
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
export function generateBlogPostingSchema(post: BlogPost): JsonLd {
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
  provider?: string
  serviceType?: string
  areaServed?: string
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

  // Add optional fields
  if (service.serviceType) {
    schema.serviceType = service.serviceType
  }
  if (service.areaServed) {
    schema.areaServed = service.areaServed
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
```

**Helper Component for Rendering JSON-LD:**

```tsx
// lib/seo/json-ld.ts (add to end of file)

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
```

**Usage Examples:**

```tsx
// app/layout.tsx - Site-wide organization schema
import { generateLocalBusinessSchema, JsonLd } from '@/lib/seo/json-ld'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <JsonLd data={generateLocalBusinessSchema()} />
        {children}
      </body>
    </html>
  )
}

// app/blog/[slug]/page.tsx - Blog post schema
import { generateBlogPostingSchema, JsonLd } from '@/lib/seo/json-ld'

export default async function BlogPost({ params }) {
  const post = await getBlogPost(params.slug)

  return (
    <>
      <JsonLd data={generateBlogPostingSchema(post)} />
      <article>{/* content */}</article>
    </>
  )
}

// app/about/page.tsx - FAQ schema
import { generateFAQPageSchema, JsonLd } from '@/lib/seo/json-ld'

export default function AboutPage() {
  const faqs = [
    { question: 'What is chiropractic care?', answer: '...' },
    { question: 'Does it hurt?', answer: '...' },
  ]

  return (
    <>
      <JsonLd data={generateFAQPageSchema(faqs)} />
      {/* page content */}
    </>
  )
}

// app/services/[slug]/page.tsx - Service schema
import { generateServiceSchema, JsonLd } from '@/lib/seo/json-ld'

export default function ServicePage({ service }) {
  return (
    <>
      <JsonLd data={generateServiceSchema(service)} />
      {/* service content */}
    </>
  )
}
```

**Business Info Requirements:**

All business information is stored in `lib/data/business-info.ts`. See the **Data Management Strategy** section below for the complete structure. The key fields used by JSON-LD schemas are:

- **Required for LocalBusiness**: `name`, `address`, `url`
- **Recommended**: `phone`, `hours`, `geo` (for local SEO)
- **Optional**: `description`, `email`, `logo`, `priceRange`, `social`

**Guidelines for Junior Engineers:**

1. **Optional Fields are OK**: If your business doesn't have coordinates, just leave `geo` out of the config. The schema will work fine without it.

2. **Testing Schemas**: Use Google's [Rich Results Test](https://search.google.com/test/rich-results) to validate your JSON-LD.

3. **Common Mistakes to Avoid**:
   - Don't include `null`, `undefined`, or empty strings
   - Don't include empty arrays `[]`
   - Only include fields with real data

4. **Required vs Optional**:
   - **Required for LocalBusiness**: `name`, `address`, `url`
   - **Recommended**: `telephone`, `openingHours`, `geo`
   - **Optional**: Everything else

5. **Multiple Schemas on One Page**: You can include multiple JSON-LD scripts on the same page:
   ```tsx
   <JsonLd data={generateLocalBusinessSchema()} />
   <JsonLd data={generateFAQPageSchema(faqs)} />
   <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
   ```

### Sitemap Generation

**File: `app/sitemap.ts`**
- Dynamic sitemap including all pages
- Include lastModified dates
- Set appropriate priority and changefreq

### Robots.txt

**File: `app/robots.ts`**
- Allow all bots (for business website)
- Reference sitemap location
- Set crawl-delay if needed

### Open Graph & Twitter Cards

- Every page must have OG tags
- Generate OG images dynamically (optional)
- Include Twitter Card metadata
- Proper image dimensions (1200x630)

## Data Management Strategy

### Business Information

All business data centralized in one location for easy updates.

**File: `lib/data/business-info.ts`**
```tsx
export const businessInfo = {
  // Core business details
  name: "Practice Name Chiropractic",
  description: "Quality chiropractic care in Your City",
  tagline: "Your path to wellness starts here",

  // Contact information
  phone: "(555) 123-4567",
  email: "contact@example.com",

  // Location
  address: {
    street: "123 Main Street",
    city: "Springfield",
    state: "CA",
    zip: "12345",
    country: "US"
  },

  // Optional: Coordinates for map and LocalBusiness schema
  geo: {
    latitude: 40.7128,
    longitude: -74.0060,
  },

  // Business hours
  hours: {
    monday: "9:00 AM - 6:00 PM",
    tuesday: "9:00 AM - 6:00 PM",
    wednesday: "9:00 AM - 6:00 PM",
    thursday: "9:00 AM - 6:00 PM",
    friday: "9:00 AM - 5:00 PM",
    saturday: "10:00 AM - 2:00 PM",
    sunday: "Closed"
  },

  // Social media profiles
  social: {
    facebook: "https://facebook.com/yourpage",
    instagram: "https://instagram.com/yourpage",
    twitter: "https://twitter.com/yourpage",
    linkedin: "https://linkedin.com/company/yourpage",
  },

  // Site metadata
  url: "https://example.com",
  logo: "/logo.png",
  priceRange: "$$", // $, $$, $$$, or $$$$
}
```

**Benefits:**
- Single source of truth for all business info
- Used across multiple pages automatically
- Easy for junior engineers to update
- Changes propagate site-wide

### Services Data

**File: `lib/data/services.ts`**
```tsx
export interface Service {
  slug: string
  title: string
  description: string
  benefits: string[]
  image: string
  duration?: string
  price?: string
}

export const services: Service[] = [
  {
    slug: "spinal-adjustment",
    title: "Spinal Adjustment",
    description: "Gentle, effective spinal adjustments to improve alignment",
    benefits: [
      "Reduces pain and discomfort",
      "Improves mobility",
      "Enhances nervous system function"
    ],
    image: "/images/services/spinal-adjustment.jpg",
    duration: "30-45 minutes",
    price: "$75"
  },
  // ... more services
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug)
}

export function getAllServices(): Service[] {
  return services
}
```

### Team Data

**File: `lib/data/team.ts`**
```tsx
export interface TeamMember {
  name: string
  title: string
  bio: string
  image: string
  certifications?: string[]
  email?: string
  phone?: string
}

export const team: TeamMember[] = [
  {
    name: "Dr. John Smith",
    title: "Doctor of Chiropractic",
    bio: "Dr. Smith has over 15 years of experience...",
    image: "/images/team/dr-smith.jpg",
    certifications: [
      "Doctor of Chiropractic (D.C.)",
      "Licensed Chiropractor, CA"
    ],
    email: "drsmith@example.com"
  },
  // ... more team members
]
```

### Testimonials Data

**File: `lib/data/testimonials.ts`**
```tsx
export interface Testimonial {
  name: string
  content: string
  rating: number
  date: string
  image?: string
  location?: string
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    content: "Dr. Smith and his team have been incredible. My back pain is completely gone!",
    rating: 5,
    date: "2025-01-15",
    location: "Springfield, CA"
  },
  // ... more testimonials
]
```

### Content Types

**TypeScript Interfaces:**
```tsx
interface Service {
  slug: string
  title: string
  description: string
  benefits: string[]
  image: string
  duration?: string
  price?: string
}

interface TeamMember {
  name: string
  title: string
  bio: string
  image: string
  certifications?: string[]
}

interface Testimonial {
  name: string
  content: string
  rating: number
  date: string
  image?: string
}
```

### Content Organization

- Static content in TypeScript files
- Long-form content in MDX files
- Images in `/public/images` organized by type
- Easy to find and update for junior engineers

## Blog Architecture

### Overview

The blog uses **ISR (Incremental Static Regeneration)** for optimal performance while maintaining content freshness. This pattern is based on industry best practices (Vercel CEO's blog) and provides:
- Static generation for fast initial loads
- Automatic revalidation for content updates
- SEO-friendly server-side rendering
- Simple content management for junior engineers

### ISR Configuration

```tsx
// app/blog/page.tsx
export const revalidate = 3600; // 1 hour

// app/blog/[slug]/page.tsx
export const revalidate = 3600; // 1 hour
```

**Revalidation Strategy:**
- **1 hour (3600s)** for blog listing and posts
- Pages are statically generated at build time
- Automatically regenerated every hour if accessed
- New posts appear within 1 hour of deployment
- Perfect balance of performance and freshness

### MDX Configuration

**File: `next.config.ts`**
```tsx
import createMDX from '@next/mdx'

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true, // Rust-based MDX compiler for performance
  },
}

const withMDX = createMDX({
  // MDX options here
})

export default withMDX(nextConfig)
```

**Benefits:**
- Write blog posts in Markdown with React components
- Type-safe with TypeScript
- Fast compilation with Rust
- Co-locate custom components with posts

### Blog File Structure

```
content/
└── blog/
    ├── understanding-chiropractic-care.mdx
    ├── back-pain-relief-tips.mdx
    └── index.ts

app/
├── blog/
│   ├── page.tsx              # Blog listing (ISR)
│   └── [slug]/
│       └── page.tsx          # Individual post (ISR + Static Params)
```


**Recommendation:** Use flat structure (`content/blog/*.mdx`) for simplicity

### Blog Post Format

**File: `content/blog/post-slug.mdx`**
```mdx
---
title: "Understanding Chiropractic Care"
description: "Learn about the benefits of chiropractic care and what to expect."
date: "2025-01-15"
author: "Dr. John Smith"
image: "/images/blog/chiropractic-care.jpg"
category: "Education"
tags: ["chiropractic", "health", "wellness"]
---

# Understanding Chiropractic Care

Regular chiropractic care can help with...

## Benefits

- Reduced pain
- Improved mobility
- Better posture

<CustomComponent />
```

### Blog Data Layer

**Approach: Metadata-Driven with JSON**

We use a JSON file for metadata (single source of truth) and MDX files for content. This is the same pattern used by Vercel CEO's blog - simple, CMS-friendly, and easy to maintain.

**File: `content/blog/posts.json`**
```json
{
  "posts": [
    {
      "slug": "understanding-chiropractic-care",
      "title": "Understanding Chiropractic Care",
      "description": "Learn about the benefits of chiropractic care and what to expect during your first visit.",
      "date": "2025-01-15",
      "author": "Dr. John Smith",
      "image": "/images/blog/chiropractic-care.jpg",
      "category": "Education",
      "tags": ["chiropractic", "health", "wellness"]
    },
    {
      "slug": "back-pain-relief-tips",
      "title": "5 Tips for Back Pain Relief",
      "description": "Simple exercises and lifestyle changes to reduce back pain.",
      "date": "2025-01-10",
      "author": "Dr. John Smith",
      "image": "/images/blog/back-pain.jpg",
      "category": "Tips",
      "tags": ["back pain", "exercises", "wellness"]
    }
  ]
}
```

**File: `lib/content/blog.ts`**
```tsx
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import postsData from '@/content/blog/posts.json'

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  author: string
  image: string
  category?: string
  tags?: string[]
}

export interface BlogPost extends BlogPostMeta {
  content: string
}

/**
 * Get all blog posts metadata only (for listings)
 * Fast - doesn't read MDX files
 */
export function getBlogPostsMeta(): BlogPostMeta[] {
  return postsData.posts
}

/**
 * Get all blog posts with content
 * Merges metadata from posts.json with MDX content
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), 'content/blog')

  const posts = postsData.posts.map(meta => {
    const filePath = path.join(postsDirectory, `${meta.slug}.mdx`)

    // Read MDX file
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { content } = matter(fileContents)

    return {
      ...meta,
      content,
    }
  })

  return posts
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const meta = postsData.posts.find(post => post.slug === slug)
  if (!meta) return null

  const filePath = path.join(process.cwd(), 'content/blog', `${meta.slug}.mdx`)

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { content } = matter(fileContents)

    return {
      ...meta,
      content,
    }
  } catch (error) {
    console.error(`Error reading blog post: ${slug}`, error)
    return null
  }
}
```

**Benefits of This Approach:**
1. **Single Source of Truth:** All metadata in `content/blog/posts.json`
2. **CMS-Ready:** JSON can be easily generated by a CMS or blog editor
3. **Fast Listings:** Can get metadata without reading MDX files
4. **Easy to Add Posts:** Add to JSON + create MDX file
5. **Simple:** No complex parsing, just JSON
6. **Proven Pattern:** Same as Vercel CEO's blog (rauchg.com)
7. **Junior-Friendly:** Clear, familiar JSON format

### Blog Listing Page

**File: `app/blog/page.tsx`**
```tsx
import { getBlogPosts } from '@/lib/content/blog'
import { generateBlogMetadata } from '@/lib/seo/metadata'
import { BlogList } from '@/components/sections/blog/BlogList'

export const revalidate = 3600 // 1 hour

export async function generateMetadata() {
  return generateBlogMetadata()
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <>
      <h1>Blog</h1>
      <BlogList posts={posts} />
    </>
  )
}
```

### Individual Blog Post Page

**File: `app/blog/[slug]/page.tsx`**
```tsx
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getBlogPosts, getBlogPost } from '@/lib/content/blog'
import { generateBlogPostMetadata } from '@/lib/seo/metadata'
import { generateBlogPostingSchema } from '@/lib/seo/json-ld'

export const revalidate = 3600 // 1 hour

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map(post => ({ slug: post.slug }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  if (!post) return {}
  return generateBlogPostMetadata(post)
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const jsonLd = generateBlogPostingSchema(post)

  return (
    <article>
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Post header */}
      <header>
        <h1>{post.title}</h1>
        <time dateTime={post.date}>{post.date}</time>
        <p>By {post.author}</p>
      </header>

      {/* Post content */}
      <MDXRemote source={post.content} />
    </article>
  )
}
```

### Blog SEO

**JSON-LD Schema for Blog Posts:**
```tsx
// lib/seo/json-ld.ts
export function generateBlogPostingSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: businessInfo.name,
      logo: {
        '@type': 'ImageObject',
        url: `${businessInfo.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${businessInfo.url}/blog/${post.slug}`,
    },
  }
}
```

**Metadata Generation:**
```tsx
// lib/seo/metadata.ts
import { businessInfo } from '@/lib/data/business-info'

export function generateBlogPostMetadata(post: BlogPost): Metadata {
  return {
    title: `${post.title} | ${businessInfo.name}`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  }
}
```

### Blog Sitemap Integration

**File: `app/sitemap.ts`**
```tsx
import { getBlogPosts } from '@/lib/content/blog'
import { businessInfo } from '@/lib/data/business-info'

export default async function sitemap() {
  const posts = await getBlogPosts()

  const blogPosts = posts.map(post => ({
    url: `${businessInfo.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: businessInfo.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${businessInfo.url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...blogPosts,
  ]
}
```

### Blog RSS Feed (Optional)

**File: `app/blog/rss.xml/route.ts`**
```tsx
import { getBlogPosts } from '@/lib/content/blog'
import { businessInfo } from '@/lib/data/business-info'

export async function GET() {
  const posts = await getBlogPosts()

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${businessInfo.name} Blog</title>
    <link>${businessInfo.url}/blog</link>
    <description>${businessInfo.description}</description>
    ${posts.map(post => `
    <item>
      <title>${post.title}</title>
      <link>${businessInfo.url}/blog/${post.slug}</link>
      <description>${post.description}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>
    `).join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
```

### Blog Components

**Reusable Blog Components:**
```
components/
└── sections/
    └── blog/
        ├── BlogList.tsx         # Grid of blog cards
        ├── BlogCard.tsx         # Individual blog preview
        ├── BlogHeader.tsx       # Post header with meta
        ├── BlogContent.tsx      # MDX content wrapper
        ├── BlogSidebar.tsx      # Categories, recent posts
        └── BlogCTA.tsx          # Newsletter signup, etc.
```

### Content Guidelines for Junior Engineers

1. **Adding a New Blog Post:**
   - Create `content/blog/post-slug.mdx`
   - Add frontmatter with required fields
   - Write content in Markdown
   - Images go in `/public/images/blog/`
   - Post appears automatically on next deploy

2. **Blog Post Checklist:**
   - [ ] Descriptive title (< 60 characters)
   - [ ] Meta description (< 160 characters)
   - [ ] Featured image (1200x630px)
   - [ ] Proper frontmatter fields
   - [ ] Internal links to services/pages
   - [ ] Alt text for all images
   - [ ] Proofread for grammar/spelling

3. **Best Practices:**
   - Keep posts focused (1000-2000 words ideal)
   - Use headings (H2, H3) for structure
   - Include relevant images/diagrams
   - Link to related services
   - Add CTA at the end
   - Use conversational tone

### Required Dependencies

```json
{
  "dependencies": {
    "@next/mdx": "^16.0.0",
    "next-mdx-remote": "^5.0.0",
    "gray-matter": "^4.0.3"
  },
  "devDependencies": {
    "@types/mdx": "^2.0.0"
  }
}
```

## Accessibility Requirements

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus visible styles
- Color contrast ratios (WCAG AA minimum)
- Alt text for all images
- Form labels and error messages
- Skip to main content link

## Development Guidelines

### For Junior Engineers

1. **Adding a New Page:**
   - Create route in `/app`
   - Add metadata export
   - Compose page using existing sections
   - Add to sitemap if needed

2. **Creating a New Section:**
   - Add to `/components/sections/[category]`
   - Accept data via props (no hard-coded content)
   - Use UI components from `/components/ui`
   - Make it responsive by default
   - Add proper TypeScript types

3. **Updating Content:**
   - Modify `/content/site.config.ts` for site-wide data
   - Update specific content files in `/content/*`
   - Replace images in `/public/images`

4. **Testing Checklist:**
   - Run Lighthouse audit (aim for 100s)
   - Test on mobile and desktop
   - Verify all links work
   - Check console for errors
   - Validate structured data (Google Rich Results Test)
   - Test forms submit correctly

## Performance Checklist

- [ ] All images optimized and using Next.js Image component
- [ ] No render-blocking resources
- [ ] Fonts optimized with next/font
- [ ] JavaScript minimal (< 100KB)
- [ ] CSS minimal (< 50KB)
- [ ] Time to Interactive < 3s on 4G
- [ ] No console errors or warnings
- [ ] Proper lazy loading configured

## SEO Checklist

- [ ] All pages have unique titles and descriptions
- [ ] JSON-LD structured data on all relevant pages
- [ ] Sitemap.xml generated and accessible
- [ ] Robots.txt configured
- [ ] Open Graph tags on all pages
- [ ] Twitter Card tags configured
- [ ] Canonical URLs set correctly
- [ ] 404 page customized
- [ ] Mobile-friendly (responsive design)

## Deployment Considerations

- Deploy on Vercel for optimal Next.js performance
- Set up custom domain
- Configure environment variables for contact forms
- Set up analytics (optional: Plausible, Fathom, or GA4)
- Configure CSP headers for security
- Set up proper caching headers
