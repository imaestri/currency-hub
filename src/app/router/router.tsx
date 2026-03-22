import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/components/shared/AppLayout'
import { RouteLoadingSkeleton } from '@/components/shared/RouteLoadingSkeleton'
import { RouteErrorBoundary } from '@/components/shared/RouteErrorBoundary'

const Dashboard = lazy(() =>
  import('@/pages/Dashboard').then((module) => ({ default: module.Dashboard })),
)

const CurrencyDetail = lazy(() =>
  import('@/pages/CurrencyDetail').then((module) => ({ default: module.CurrencyDetail })),
)

const NotFound = lazy(() =>
  import('@/pages/NotFound').then((module) => ({ default: module.NotFound })),
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<RouteLoadingSkeleton />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: 'currency/:code',
        element: (
          <Suspense fallback={<RouteLoadingSkeleton />}>
            <CurrencyDetail />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<RouteLoadingSkeleton />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
])
