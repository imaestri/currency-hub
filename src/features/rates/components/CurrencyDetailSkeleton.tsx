import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CurrencyDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="border-white/70 bg-white/80 shadow-soft backdrop-blur">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-10 w-72 max-w-full" />
          </div>
          <div className="space-y-3 rounded-2xl bg-secondary px-4 py-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-24" />
          </div>
        </CardHeader>
      </Card>

      <Card className="border-white/70 bg-white/80 shadow-soft backdrop-blur">
        <CardHeader>
          <Skeleton className="h-7 w-32" />
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          <div className="flex items-end justify-between gap-3">
            <Skeleton className="h-52 w-8 rounded-full" />
            <Skeleton className="h-36 w-8 rounded-full" />
            <Skeleton className="h-44 w-8 rounded-full" />
            <Skeleton className="h-64 w-8 rounded-full" />
            <Skeleton className="h-40 w-8 rounded-full" />
            <Skeleton className="h-56 w-8 rounded-full" />
            <Skeleton className="h-48 w-8 rounded-full" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
