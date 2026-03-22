import { AlertTriangle, ArrowLeft, Home, RefreshCw } from 'lucide-react'
import {
  isRouteErrorResponse,
  Link,
  useLocation,
  useRouteError,
} from 'react-router-dom'
import { Button } from '@/components/ui/button'

function getErrorCopy(error: unknown, pathname: string) {
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      if (pathname.startsWith('/currency/')) {
        const currencyCode = pathname.split('/').at(-1)?.toUpperCase() ?? 'UNKNOWN'

        return {
          title: 'Currency not found',
          description: `We couldn't find details for "${currencyCode}". Check the code and try again.`,
        }
      }

      return {
        title: 'Page not found',
        description: "The page you're trying to open doesn't exist or may have moved.",
      }
    }

    return {
      title: `${error.status} ${error.statusText}`,
      description:
        typeof error.data === 'string'
          ? error.data
          : 'Something went wrong while loading this route.',
    }
  }

  if (error instanceof Error) {
    return {
      title: 'Unexpected application error',
      description: error.message,
    }
  }

  return {
    title: 'Unexpected application error',
    description: 'Something went wrong while rendering this screen.',
  }
}

export function RouteErrorBoundary() {
  const error = useRouteError()
  const { pathname } = useLocation()
  const copy = getErrorCopy(error, pathname)

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-soft backdrop-blur">
        <div className="mb-6 inline-flex rounded-2xl bg-secondary p-3 text-secondary-foreground">
          <AlertTriangle className="size-6" />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Route error
          </p>
          <h1 className="text-4xl leading-tight sm:text-5xl">{copy.title}</h1>
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            {copy.description}
          </p>
          <p className="text-sm text-muted-foreground">
            Current path: <span className="font-medium text-foreground">{pathname}</span>
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 size-4" />
              Go to dashboard
            </Link>
          </Button>
          <Button type="button" variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 size-4" />
            Go back
          </Button>
          <Button type="button" variant="ghost" onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 size-4" />
            Reload
          </Button>
        </div>
      </div>
    </div>
  )
}
