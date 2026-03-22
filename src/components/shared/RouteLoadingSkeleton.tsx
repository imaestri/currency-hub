import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function RouteLoadingSkeleton() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[2rem] border border-white/70 bg-white/70 p-8 shadow-soft backdrop-blur">
          <Skeleton className="h-8 w-40 rounded-full" />
          <div className="mt-6 space-y-4">
            <Skeleton className="h-12 w-full max-w-2xl" />
            <Skeleton className="h-12 w-4/5 max-w-xl" />
            <Skeleton className="h-5 w-full max-w-xl" />
            <Skeleton className="h-5 w-3/4 max-w-lg" />
          </div>
          <div className="mt-8 flex gap-3">
            <Skeleton className="h-11 w-40" />
            <Skeleton className="h-11 w-36" />
          </div>
        </div>

        <Card className="border-white/70 bg-white/80 shadow-soft backdrop-blur">
          <CardHeader>
            <Skeleton className="h-7 w-40" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-12 w-36" />
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <Card
            key={index}
            className="border-white/70 bg-white/75 shadow-soft backdrop-blur"
          >
            <CardContent className="flex items-start gap-4 p-6">
              <Skeleton className="size-12 rounded-2xl" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
