export interface GalleryItem {
  id: string
  image: string
  alt: string
}

export interface GalleryContent {
  title: string
  subtitle?: string
  items: GalleryItem[]
}

/**
 * Gallery section content
 * Update this to modify the gallery shown on the site
 */
export const galleryContent: GalleryContent = {
  title: 'Experience Our Healing Sanctuary',
  subtitle:
    'Take a look at our professional treatment space designed for your comfort and wellness',
  items: [
    {
      id: 'gallery-1',
      image: '/gallery/treatment-room-1.jpeg',
      alt: 'Modern chiropractic treatment room',
    },
    {
      id: 'gallery-2',
      image: '/gallery/treatment-room-2.jpeg',
      alt: 'Professional chiropractic adjustment space',
    },
    {
      id: 'gallery-3',
      image: '/gallery/reception-area.jpeg',
      alt: 'Welcoming reception area',
    },
    {
      id: 'gallery-4',
      image: '/gallery/equipment.jpeg',
      alt: 'State-of-the-art chiropractic equipment',
    },
    {
      id: 'gallery-5',
      image: '/gallery/waiting-area.jpeg',
      alt: 'Comfortable waiting area',
    },
  ],
}

/**
 * Get all gallery items
 */
export function getGalleryItems(): GalleryItem[] {
  return galleryContent.items
}
