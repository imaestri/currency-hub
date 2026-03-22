import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CurrenciesTableSkeleton() {
  return (
    <Card className="border-white/70 bg-white/80 shadow-soft backdrop-blur">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl">Currencies directory</CardTitle>
        <Skeleton className="h-4 w-80 max-w-full" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-6 gap-4 border-b pb-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-full" />
          ))}
        </div>
        {Array.from({ length: 3 }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-6 gap-4 border-b py-4 last:border-b-0">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-5 w-10" />
            <Skeleton className="ml-auto h-5 w-16" />
            <Skeleton className="ml-auto h-5 w-20" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
