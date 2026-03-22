import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type SkeletonProps = ComponentProps<'div'>

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('animate-pulse rounded-xl bg-muted/80', className)}
      {...props}
    />
  )
}
