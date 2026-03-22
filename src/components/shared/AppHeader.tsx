import { Coins } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useRatesStore } from '@/features/rates/store/useRatesStore'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'Overview' },
  { to: '/currency/USD', label: 'Currency' },
]

export function AppHeader() {
  const selectedCurrencyCode = useRatesStore((state) => state.selectedCurrencyCode)

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

        <div className="hidden rounded-full border border-border/80 bg-white/80 px-4 py-2 text-sm text-muted-foreground shadow-soft sm:block">
          Active code: <span className="font-semibold text-foreground">{selectedCurrencyCode}</span>
        </div>
      </div>
    </header>
  )
}
