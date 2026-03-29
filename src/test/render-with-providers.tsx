import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

type RenderWithProvidersOptions = {
  route?: string
  path?: string
  additionalRoutes?: ReactNode
  queryClient?: QueryClient
} & Omit<RenderOptions, 'wrapper'>

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  })
}

export function renderWithProviders(
  ui: ReactElement,
  {
    route = '/',
    path = '*',
    additionalRoutes,
    queryClient = createTestQueryClient(),
    ...renderOptions
  }: RenderWithProvidersOptions = {},
) {
  return {
    queryClient,
    ...render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path={path} element={ui} />
            {additionalRoutes}
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
      renderOptions,
    ),
  }
}
