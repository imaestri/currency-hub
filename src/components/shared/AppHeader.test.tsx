import { screen, waitFor } from '@testing-library/react'
import { AppHeader } from '@/components/shared/AppHeader'
import { useRatesStore } from '@/features/rates/store/useRatesStore'
import { renderWithProviders } from '@/test/render-with-providers'

describe('AppHeader', () => {
  it('does not render the favorite spotlight when there are no favorites', async () => {
    renderWithProviders(<AppHeader />, {
      route: '/',
      path: '*',
    })

    expect(screen.queryByText(/Pinned currency/i)).not.toBeInTheDocument()

    await waitFor(() => {
      expect(document.title).toBe('CurrencyHub')
    })
  })

  it('renders the favorite spotlight and updates the document title', async () => {
    useRatesStore.setState({ favoriteCodes: ['USD'] })

    renderWithProviders(<AppHeader />, {
      route: '/',
      path: '*',
    })

    expect(await screen.findByText(/USD · United States Dollar/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(document.title).toBe('USD 5.10 ↑ | CurrencyHub')
    })
  })
})
