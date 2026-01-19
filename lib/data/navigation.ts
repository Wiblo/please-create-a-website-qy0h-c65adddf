import {
  Facebook,
  Instagram,
  Mail,
  type LucideIcon
} from "lucide-react"

export interface NavItem {
  label: string
  href: string
  external?: boolean // For links that open in new tab
}

export interface SocialLink {
  label: string
  href: string
  icon: LucideIcon | React.FC<{ className?: string }>
}

// Main navigation items
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Treatments", href: "/treatments" },
  { label: "Contact", href: "/contact" },
]

// Footer quick links (can include booking link)
export const quickLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Treatments", href: "/treatments" },
  { label: "Contact", href: "/contact" },
  // Booking link will be added dynamically from businessInfo.bookingUrl
]

// Social media links
// Note: WhatsApp icon needs to be imported separately if used
export const socialLinks: SocialLink[] = [
  {
    label: "Facebook",
    href: "", // Will be populated from businessInfo.social.facebook
    icon: Facebook,
  },
  {
    label: "Instagram",
    href: "", // Will be populated from businessInfo.social.instagram
    icon: Instagram,
  },
  // WhatsApp requires custom icon component
  // {
  //   label: "WhatsApp",
  //   href: "", // Will be populated from businessInfo.social.whatsapp
  //   icon: WhatsAppIcon,
  // },
  {
    label: "Email",
    href: "", // Will be populated from businessInfo.email
    icon: Mail,
  },
]

// Helper function to get social links with URLs from businessInfo
export function getSocialLinksWithUrls(businessInfo: {
  social?: Record<string, string | undefined>
  email?: string
}): SocialLink[] {
  return socialLinks
    .map(link => {
      let href = link.href

      // Map social links from businessInfo
      if (link.label === "Facebook" && businessInfo.social?.facebook) {
        href = businessInfo.social.facebook
      } else if (link.label === "Instagram" && businessInfo.social?.instagram) {
        href = businessInfo.social.instagram
      } else if (link.label === "Email" && businessInfo.email) {
        href = `mailto:${businessInfo.email}`
      }

      return {
        ...link,
        href,
      }
    })
    .filter(link => link.href) // Filter out links without URLs
}

// Helper function to get quick links with booking URL
export function getQuickLinksWithBooking(bookingUrl?: string): NavItem[] {
  const links = [...quickLinks]

  if (bookingUrl) {
    links.push({
      label: "Book Appointment",
      href: bookingUrl,
      external: true,
    })
  }

  return links
}
