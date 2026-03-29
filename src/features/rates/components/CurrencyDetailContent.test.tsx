import { Suspense } from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CurrencyDetailContent } from '@/features/rates/components/CurrencyDetailContent'
import { renderWithProviders } from '@/test/render-with-providers'

vi.mock('@/features/rates/components/CurrencyTrendChart', () => ({
  CurrencyTrendChart: ({ snapshot }: { snapshot: { code: string } }) => (
    <div>Trend chart for {snapshot.code}</div>
  ),
}))

describe('CurrencyDetailContent', () => {
  it('renders the currency snapshot and chart section', async () => {
    renderWithProviders(
      <Suspense fallback={<div>Loading detail...</div>}>
        <CurrencyDetailContent code="USD" />
      </Suspense>,
    )

    expect(await screen.findByText(/United States Dollar \(USD\)/i)).toBeInTheDocument()
    expect(screen.getByText(/North America/i)).toBeInTheDocument()
    expect(screen.getByText(/Reference price in BRL/i)).toBeInTheDocument()
    expect(screen.getByText('Trend chart for USD')).toBeInTheDocument()
  })

  it('allows toggling the current currency as favorite', async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <Suspense fallback={<div>Loading detail...</div>}>
        <CurrencyDetailContent code="USD" />
      </Suspense>,
    )

    const favoriteButton = await screen.findByRole('button', { name: /save to header/i })
    await user.click(favoriteButton)

    expect(await screen.findByRole('button', { name: /saved to header/i })).toBeInTheDocument()
  })
})
