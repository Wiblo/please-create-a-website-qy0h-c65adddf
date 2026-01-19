# CLAUDE.md

This file provides guidance to Wiblo powered by Claude Code when working this repository.

## Project Overview

**Purpose:** A production-ready Next.js template for chiropractor websites optimized for perfect Lighthouse scores (100/100/100/100), excellent SEO, and maintainability by junior engineers.

**Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui (New York style)

**Architecture:** Component-based with sections as building blocks. See `architecture.md` for complete details.

## Development Commands

```bash
# Start development server (uses webpack explicitly)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Type check
pnpm type-check

# Run both lint + type-check
pnpm check
```

Note: The dev and build scripts explicitly use `--webpack` flag instead of the default Turbopack.

## Architecture

### UI Component System

The project uses shadcn/ui with the following configuration:
- **Style**: "new-york"
- **Base color**: neutral
- **Icon library**: lucide-react
- **RSC enabled**: Components are React Server Components by default

All UI components are located in `components/ui/` and are built on top of Radix UI primitives. The component library includes 50+ pre-built components including forms, dialogs, tables, charts, and layout components.

### Path Aliases

TypeScript path aliases are configured in `tsconfig.json`:
- `@/*` maps to project root
- shadcn/ui also defines aliases in `components.json`:
  - `@/components` → components directory
  - `@/lib` → lib directory
  - `@/hooks` → hooks directory
  - `@/ui` → components/ui directory

### Styling

The project uses Tailwind CSS 4 with a custom theme system:
- CSS variables defined in `app/globals.css` using OKLCH color space
- Theme configuration uses `@theme inline` directive
- Dark mode implemented via `.dark` class selector with custom variant `@custom-variant dark (&:is(.dark *))`
- Custom color tokens for background, foreground, primary, secondary, muted, accent, destructive, and chart colors
- Sidebar-specific color tokens for complex layouts
- Animation utilities via `tw-animate-css` package

### Utility Functions

**`lib/utils.ts`**:
- `cn()` function for merging Tailwind classes using `clsx` and `tailwind-merge`

**`hooks/use-mobile.ts`**:
- `useIsMobile()` hook with 768px breakpoint
- Returns `boolean` indicating mobile viewport state

### App Structure

- **App Router**: Using Next.js App Router (not Pages Router)
- **Layout**: Root layout in `app/layout.tsx` configures Geist fonts (sans and mono)
- **Main page**: `app/page.tsx` contains the default Next.js landing page

## Key Dependencies

- **React/Next.js**: React 19.2.0, Next.js 16.0.2
- **Form handling**: react-hook-form, @hookform/resolvers, zod 4.1.12
- **UI primitives**: Radix UI components (@radix-ui/*)
- **Charts**: recharts 2.15.4
- **Theming**: next-themes for dark mode
- **Carousels**: embla-carousel-react
- **Notifications**: sonner
- **Date handling**: date-fns, react-day-picker

## Component Architecture

### Three-Tier System
```
UI Components (shadcn) → Sections → Pages
```

**UI Components** (`components/ui/`): shadcn/ui primitives - DO NOT modify
**Sections** (`components/sections/`): Page building blocks (HeroSimple, ServicesGrid, etc.)
**Wrappers** (`components/layout/`): Container (max-width + padding), SectionWrapper (vertical spacing)
**Pages** (`app/**/page.tsx`): Composed entirely of sections

### Creating New Sections

All sections should use the wrapper pattern:

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

**Benefits:**
- Consistent spacing throughout the site
- Junior engineers build pages like Lego blocks
- No need to remember spacing values

### Building Pages

Pages are just sections stacked together:

```tsx
// app/page.tsx
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

## Data Management

All business data is centralized for easy updates:

**Business Info** (`lib/data/business-info.ts`): Name, address, phone, hours, social
**Services** (`lib/data/services.ts`): Service offerings with getServiceBySlug()
**Team** (`lib/data/team.ts`): Team members and certifications
**Testimonials** (`lib/data/testimonials.ts`): Customer reviews

**Update business info once, changes propagate site-wide:**
- JSON-LD schemas
- Contact pages
- Footer
- Metadata

## Blog Architecture

**Pattern:** Metadata-driven with JSON + MDX (same as Vercel CEO's blog)

### Quick Start

1. **Add metadata** to `content/blog/posts.json`:
```json
{
  "posts": [
    {
      "slug": "my-post",
      "title": "My Post Title",
      "description": "Post description",
      "date": "2025-01-15",
      "author": "Dr. Smith",
      "image": "/images/blog/my-post.jpg"
    }
  ]
}
```

2. **Create MDX file** at `content/blog/my-post.mdx`:
```mdx
# My Post Title

Content here...
```

3. **Done!** Post appears automatically at `/blog/my-post`

### How It Works

- **posts.json**: Single source of truth for metadata
- **MDX files**: Content only (no frontmatter needed)
- **ISR**: Pages regenerate every hour (`revalidate = 3600`)
- **Functions**: `getBlogPosts()`, `getBlogPost(slug)` in `lib/content/blog.ts`

### Blog Utilities

```tsx
import { getBlogPosts, getBlogPostsMeta } from '@/lib/content/blog'

// Get all posts with content (for individual pages)
const posts = await getBlogPosts()

// Get metadata only (fast, for listings)
const meta = getBlogPostsMeta()
```

## SEO Implementation

### Manual JSON-LD (No Library)

We use manual JSON-LD for full control and simplicity:

```tsx
// In any page
import { generateLocalBusinessSchema, JsonLd } from '@/lib/seo/json-ld'
import { businessInfo } from '@/lib/data/business-info'

export default function Page() {
  return (
    <>
      <JsonLd data={generateLocalBusinessSchema()} />
      {/* page content */}
    </>
  )
}
```

**Available schemas** (`lib/seo/json-ld.ts`):
- `generateLocalBusinessSchema()` - Organization/business info
- `generateBlogPostingSchema(post)` - Blog posts
- `generateFAQPageSchema(faqs)` - FAQ sections
- `generatePersonSchema(person)` - Team members
- `generateServiceSchema(service)` - Service pages
- `generateReviewSchema(review)` - Testimonials
- `generateBreadcrumbSchema(breadcrumbs)` - Navigation

**Pattern for optional fields:**
```tsx
const schema = { /* required fields */ }

if (businessInfo.phone) {
  schema.telephone = businessInfo.phone
}
```

### Metadata Generation

```tsx
// lib/seo/metadata.ts
import { businessInfo } from '@/lib/data/business-info'

export function generatePageMetadata(title: string, description: string) {
  return {
    title: `${title} | ${businessInfo.name}`,
    description,
    openGraph: { /* ... */ },
    twitter: { /* ... */ }
  }
}
```

## Common Tasks

### Add a New Page
1. Create `app/new-page/page.tsx`
2. Export metadata with `generateMetadata()`
3. Compose using sections
4. Add to sitemap if needed

### Add a New Section
1. Create `components/sections/category/SectionName.tsx`
2. Use Container + SectionWrapper
3. Accept data via props (no hard-coded content)
4. Use shadcn/ui components

### Update Business Info
1. Edit `lib/data/business-info.ts`
2. Changes apply everywhere automatically

### Add a Blog Post
1. Add metadata to `content/blog/posts.json`
2. Create `content/blog/slug.mdx`
3. Add image to `/public/images/blog/`
4. Deploy (appears within 1 hour via ISR)

### Test SEO
- **Lighthouse**: Run in Chrome DevTools
- **Rich Results**: https://search.google.com/test/rich-results
- **Sitemap**: Visit `/sitemap.xml`
- **Robots**: Visit `/robots.txt`

## Performance Targets

Aim for perfect Lighthouse scores on all pages:
- **Performance**: 100
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

**Key optimizations:**
- Use Server Components by default
- Only `"use client"` when needed (forms, interactivity)
- Next.js `<Image>` component for all images
- ISR for blog posts (`revalidate = 3600`)
- Minimal JavaScript (< 100KB)

## Component Development

When adding new shadcn/ui components, they should be added to `components/ui/` following the existing patterns:
- Import from Radix UI primitives
- Use `cn()` utility for className merging
- Apply Tailwind classes using the custom color token system
- Export components with proper TypeScript types

When creating new components outside the UI library, place them in `components/` (not in `components/ui/`).

## Full Documentation

For complete architectural details, design patterns, and implementation guidelines, see **`architecture.md`**.
