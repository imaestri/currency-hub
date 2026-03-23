import { useEffect } from 'react'
import { ArrowDownRight, ArrowUpRight, Coins, Minus } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'
import { useFavoriteCurrencySpotlight } from '@/features/rates/hooks/useFavoriteCurrencySpotlight'
import { useRatesStore } from '@/features/rates/store/useRatesStore'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'Overview' },
  { to: '/currencies', label: 'Currencies' },
]

export function AppHeader() {
  const favoriteCodes = useRatesStore((state) => state.favoriteCodes)
  const spotlightCode = favoriteCodes[0]
  const spotlightQuery = useFavoriteCurrencySpotlight(spotlightCode)
  const spotlightSnapshot = spotlightQuery.data

  const latestRate = spotlightSnapshot?.trend.at(-1)?.rate ?? 0
  const previousRate = spotlightSnapshot?.trend.at(-2)?.rate ?? latestRate
  const rateDirection =
    latestRate > previousRate ? 'up' : latestRate < previousRate ? 'down' : 'flat'

  useEffect(() => {
    if (!spotlightSnapshot) {
      document.title = 'CurrencyHub'
      return
    }

    const directionSymbol =
      rateDirection === 'up' ? '↑' : rateDirection === 'down' ? '↓' : '→'

    document.title = `${spotlightSnapshot.code} ${latestRate.toFixed(2)} ${directionSymbol} | CurrencyHub`
  }, [latestRate, rateDirection, spotlightSnapshot])

  return (
    <header className="sticky top-0 z-20 border-b border-white/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-3" to="/">
          <div className="rounded-2xl bg-primary p-2 text-primary-foreground shadow-soft">
            <Coins className="size-5" />
          </div>
          <div>
            <p className="font-heading text-lg font-semibold">CurrencyHub</p>
            <p className="text-sm text-muted-foreground">Feature-based exchange workspace</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 rounded-full border border-border/80 bg-white/80 p-1 shadow-soft">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors',
                  isActive && 'bg-secondary text-secondary-foreground',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {spotlightCode ? (
          <div className="hidden min-w-[18rem] rounded-2xl border border-border/80 bg-white/80 px-4 py-3 text-sm text-muted-foreground shadow-soft sm:block">
            {spotlightQuery.isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-28" />
                <div className="flex items-center justify-between gap-3">
                  <Skeleton className="h-7 w-20" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
            ) : spotlightSnapshot ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-semibold text-foreground">
                      {spotlightSnapshot.code} · {spotlightSnapshot.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{spotlightSnapshot.region}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">
                      {spotlightSnapshot.symbol}
                      {latestRate.toFixed(2)}
                    </div>
                    <div
                      className={cn(
                        'inline-flex items-center gap-1 text-xs font-medium',
                        rateDirection === 'up' && 'text-emerald-600',
                        rateDirection === 'down' && 'text-destructive',
                        rateDirection === 'flat' && 'text-muted-foreground',
                      )}
                    >
                      {rateDirection === 'up' ? (
                        <ArrowUpRight className="size-3.5" />
                      ) : rateDirection === 'down' ? (
                        <ArrowDownRight className="size-3.5" />
                      ) : (
                        <Minus className="size-3.5" />
                      )}
                      {rateDirection === 'up'
                        ? 'Up vs previous close'
                        : rateDirection === 'down'
                          ? 'Down vs previous close'
                          : 'No change'}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="font-medium text-foreground">Favorite spotlight</div>
                <p className="text-xs text-muted-foreground">
                  We could not load your highlighted currency right now.
                </p>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </header>
  )
}
