import { lazy, Suspense } from 'react'
import { Star, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { CurrencyTrendChartSkeleton } from '@/features/rates/components/CurrencyTrendChartSkeleton'
import { useCurrencySnapshot } from '@/features/rates/hooks/useCurrencySnapshot'
import { useRatesStore } from '@/features/rates/store/useRatesStore'

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
  const favoriteCodes = useRatesStore((state) => state.favoriteCodes)
  const toggleFavorite = useRatesStore((state) => state.toggleFavorite)

  const latestRate = snapshot.trend.at(-1)?.rate ?? 0
  const isFavorite = favoriteCodes.includes(snapshot.code)

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
          <div className="flex flex-col gap-3 sm:items-end">
            <Button
              type="button"
              variant={isFavorite ? 'secondary' : 'outline'}
              onClick={() => toggleFavorite(snapshot.code)}
            >
              <Star className={isFavorite ? 'mr-2 size-4 fill-accent text-accent' : 'mr-2 size-4'} />
              {isFavorite ? 'Saved to header' : 'Save to header'}
            </Button>
            <div className="rounded-2xl bg-secondary px-4 py-3 text-right">
              <div className="text-sm text-muted-foreground">Reference price in BRL</div>
              <div className="flex items-center gap-2 text-2xl font-semibold text-foreground">
                <TrendingUp className="size-5 text-primary" />
                {snapshot.symbol}
                {latestRate.toFixed(2)}
              </div>
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
