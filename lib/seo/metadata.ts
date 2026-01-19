import { businessInfo } from '@/lib/data/business-info'
import type { Metadata } from 'next'

/**
 * Generate page metadata with consistent defaults
 * @param title - Page title (will be appended with business name)
 * @param description - Meta description for the page
 * @param path - Relative path for canonical URL (e.g., '/about')
 * @param image - Open Graph image URL (absolute or relative path)
 * @returns Metadata object for Next.js
 */
export function generatePageMetadata(
  title: string,
  description: string,
  path: string = '',
  image?: string
): Metadata {
  const fullTitle = `${title} | ${businessInfo.name}`
  const url = `${businessInfo.url}${path}`
  const ogImage = image || businessInfo.logo
    ? `${businessInfo.url}${image || businessInfo.logo}`
    : undefined

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: businessInfo.name,
      type: 'website',
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImage && {
        images: [ogImage],
      }),
    },
  }
}

/**
 * Generate metadata for blog listing page
 */
export function generateBlogMetadata(): Metadata {
  return generatePageMetadata(
    'Blog',
    `Latest news, tips, and insights from ${businessInfo.name}`,
    '/blog'
  )
}

/**
 * Generate metadata for individual blog posts
 * @param post - Blog post object with metadata
 */
export function generateBlogPostMetadata(post: {
  title: string
  description: string
  slug: string
  date: string
  author: string
  image?: string
}): Metadata {
  const url = `${businessInfo.url}/blog/${post.slug}`
  const ogImage = post.image
    ? post.image.startsWith('http')
      ? post.image
      : `${businessInfo.url}${post.image}`
    : undefined

  return {
    title: `${post.title} | ${businessInfo.name}`,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: businessInfo.name,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      ...(ogImage && {
        images: [ogImage],
      }),
    },
  }
}

/**
 * Generate metadata for service pages
 * @param service - Service object with metadata
 */
export function generateServiceMetadata(service: {
  title: string
  description: string
  slug: string
  image?: string
}): Metadata {
  return generatePageMetadata(
    service.title,
    service.description,
    `/services/${service.slug}`,
    service.image
  )
}

/**
 * Default metadata for homepage
 */
export function generateHomeMetadata(): Metadata {
  return {
    title: `${businessInfo.name} | ${businessInfo.tagline}`,
    description: businessInfo.description,
    alternates: {
      canonical: businessInfo.url,
    },
    openGraph: {
      title: businessInfo.name,
      description: businessInfo.description,
      url: businessInfo.url,
      siteName: businessInfo.name,
      type: 'website',
      ...(businessInfo.logo && {
        images: [
          {
            url: `${businessInfo.url}${businessInfo.logo}`,
            width: 1200,
            height: 630,
            alt: businessInfo.name,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: businessInfo.name,
      description: businessInfo.description,
      ...(businessInfo.logo && {
        images: [`${businessInfo.url}${businessInfo.logo}`],
      }),
    },
  }
}
