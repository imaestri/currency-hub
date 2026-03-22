import { lazy, Suspense } from 'react'
import { TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { CurrencyTrendChartSkeleton } from '@/features/rates/components/CurrencyTrendChartSkeleton'
import { useCurrencySnapshot } from '@/features/rates/hooks/useCurrencySnapshot'

type CurrencyDetailContentProps = {
  code: string
}

const CurrencyTrendChart = lazy(() =>
  import('@/features/rates/components/CurrencyTrendChart').then((module) => ({
    default: module.CurrencyTrendChart,
  })),
)

export function CurrencyDetailContent({ code }: CurrencyDetailContentProps) {
  const snapshotQuery = useCurrencySnapshot(code)
  const snapshot = snapshotQuery.data

  const latestRate = snapshot.trend.at(-1)?.rate ?? 0

  return (
    <div className="space-y-6">
      <Card className="border-white/70 bg-white/80 shadow-soft backdrop-blur">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Badge variant="secondary">{snapshot.region}</Badge>
            <CardTitle className="text-3xl">
              {snapshot.name} ({snapshot.code})
            </CardTitle>
          </div>
          <div className="rounded-2xl bg-secondary px-4 py-3 text-right">
            <div className="text-sm text-muted-foreground">Latest BRL reference</div>
            <div className="flex items-center gap-2 text-2xl font-semibold text-foreground">
              <TrendingUp className="size-5 text-primary" />
              {snapshot.symbol}
              {latestRate.toFixed(2)}
            </div>
          </div>
        </CardHeader>
      </Card>

      <Suspense fallback={<CurrencyTrendChartSkeleton />}>
        <CurrencyTrendChart snapshot={snapshot} />
      </Suspense>
    </div>
  )
}
