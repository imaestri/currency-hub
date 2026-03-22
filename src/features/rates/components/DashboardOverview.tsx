import { ArrowRight, BarChart3, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CurrencySearchForm } from '@/features/rates/components/CurrencySearchForm'

const highlights = [
  {
    title: 'Feature-based structure',
    description: 'Rates logic lives together in one domain folder with clear component, hook, service, and store boundaries.',
    icon: Wallet,
  },
  {
    title: 'Clear data flow',
    description: 'Hooks fetch data, services talk to APIs, and components stay focused on rendering and interaction.',
    icon: BarChart3,
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[2rem] border border-white/70 bg-white/70 p-8 shadow-soft backdrop-blur">
          <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
            CurrencyHub starter
          </span>
          <div className="mt-6 max-w-2xl space-y-4">
            <h1 className="text-4xl leading-tight sm:text-5xl">
              Build currency flows on top of a clean feature-based foundation.
            </h1>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              The project is organized by domain so rates-related logic stays together and the app
              remains easy to scale.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link to="/currencies">
                Explore all the currencies
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://ui.shadcn.com/" target="_blank" rel="noreferrer">
                View shadcn/ui
              </a>
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
