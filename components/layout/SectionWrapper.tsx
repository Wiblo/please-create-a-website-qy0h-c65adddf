import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  as?: 'section' | 'div' | 'article' | 'main'
}

/**
 * SectionWrapper provides consistent vertical spacing between page sections
 * Use this to wrap all major page sections for uniform spacing
 */
export function SectionWrapper({
  children,
  className,
  as: Component = 'section'
}: SectionWrapperProps) {
  return (
    <Component className={cn('py-16 md:py-24', className)}>
      {children}
    </Component>
  )
}
