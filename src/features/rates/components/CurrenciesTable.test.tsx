import { Suspense } from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { Route } from 'react-router-dom'
import { CurrenciesTable } from '@/features/rates/components/CurrenciesTable'
import { server } from '@/test/server'
import { renderWithProviders } from '@/test/render-with-providers'
import { TestErrorBoundary } from '@/test/test-error-boundary'

const FRANKFURTER_API_BASE_URL = 'https://api.frankfurter.dev/v1'

describe('CurrenciesTable', () => {
  it('renders rows from the Frankfurter list response', async () => {
    renderWithProviders(
      <Suspense fallback={<div>Loading currencies...</div>}>
        <CurrenciesTable />
      </Suspense>,
      {
        route: '/',
        path: '/',
      },
    )

    expect(await screen.findByText('United States Dollar')).toBeInTheDocument()
    expect(screen.getByText('Euro')).toBeInTheDocument()
    expect(screen.getByText('British Pound Sterling')).toBeInTheDocument()
  })

  it('allows favoriting and unfavoriting a currency', async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <Suspense fallback={<div>Loading currencies...</div>}>
        <CurrenciesTable />
      </Suspense>,
      {
        route: '/',
        path: '/',
      },
    )

    const favoriteButton = await screen.findByLabelText(/add usd to favorites/i)
    await user.click(favoriteButton)

    expect(await screen.findByLabelText(/remove usd from favorites/i)).toBeInTheDocument()
  })

  it('navigates to the detail route when a row is clicked', async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <Suspense fallback={<div>Loading currencies...</div>}>
        <CurrenciesTable />
      </Suspense>,
      {
        route: '/',
        path: '/',
        additionalRoutes: <Route path="/currencies/:code" element={<div>Currency detail route</div>} />,
      },
    )

    await user.click(await screen.findByText('United States Dollar'))

    expect(await screen.findByText('Currency detail route')).toBeInTheDocument()
  })

  it('shows a fallback when the currencies request fails', async () => {
    server.use(
      http.get(`${FRANKFURTER_API_BASE_URL}/latest`, () => {
        return HttpResponse.json({ message: 'Server error' }, { status: 500 })
      }),
    )

    renderWithProviders(
      <TestErrorBoundary fallback={<div>Failed to load currencies</div>}>
        <Suspense fallback={<div>Loading currencies...</div>}>
          <CurrenciesTable />
        </Suspense>
      </TestErrorBoundary>,
      {
        route: '/',
        path: '/',
      },
    )

    expect(await screen.findByText('Failed to load currencies')).toBeInTheDocument()
  })
})
