import { Compass, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function NotFound() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-soft backdrop-blur">
        <div className="mb-6 inline-flex rounded-2xl bg-secondary p-3 text-secondary-foreground">
          <Compass className="size-6" />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            404
          </p>
          <h1 className="text-4xl leading-tight sm:text-5xl">We could not find this page</h1>
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            The address you entered does not match any page in CurrencyHub. Go back to the
            dashboard and continue from there.
          </p>
        </div>

        <div className="mt-8">
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 size-4" />
              Go to dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
