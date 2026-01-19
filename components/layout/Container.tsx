import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

/**
 * Container component provides max-width constraint and horizontal padding
 * Use this inside SectionWrapper to contain content within a centered column
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('container mx-auto px-4 md:px-6 max-w-7xl', className)}>
      {children}
    </div>
  )
}
