import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CurrencyTrendChartSkeleton() {
  return (
    <Card className="border-white/70 bg-white/80 shadow-soft backdrop-blur">
      <CardHeader>
        <CardTitle>Weekly trend</CardTitle>
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
  )
}
