import { ArrowRight, BarChart3, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CurrencySearchForm } from '@/features/rates/components/CurrencySearchForm'

const highlights = [
  {
    title: 'Everything in one place',
    description: 'Browse supported currencies, compare them using BRL as the reference currency, and keep the ones you care about easy to revisit.',
    icon: Wallet,
  },
  {
    title: 'Simple to explore',
    description: 'Search by currency code, open the detail view, and understand recent movement without digging through a complex interface.',
    icon: BarChart3,
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[2rem] border border-white/70 bg-white/70 p-8 shadow-soft backdrop-blur">
          <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
            Currency overview
          </span>
          <div className="mt-6 max-w-2xl space-y-4">
            <h1 className="text-4xl leading-tight sm:text-5xl">
              Explore currencies with BRL as your reference, without getting lost in the interface.
            </h1>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              Search by code, open the full currency directory, and keep your favorite currencies
              visible in the header while you explore.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link to="/currencies">
                Open currency directory
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
        <CurrencySearchForm />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {highlights.map(({ title, description, icon: Icon }) => (
          <Card key={title} className="border-white/70 bg-white/75 shadow-soft backdrop-blur">
            <CardContent className="flex items-start gap-4 p-6">
              <div className="rounded-2xl bg-secondary p-3 text-secondary-foreground">
                <Icon className="size-5" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl">{title}</h2>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
