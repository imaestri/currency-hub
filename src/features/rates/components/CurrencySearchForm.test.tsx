import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { Route, useLocation } from 'react-router-dom'
import { CurrencySearchForm } from '@/features/rates/components/CurrencySearchForm'
import { renderWithProviders } from '@/test/render-with-providers'

function LocationProbe() {
  const location = useLocation()

  return <div>{location.pathname}</div>
}

describe('CurrencySearchForm', () => {
  it('renders the field and call to action', () => {
    renderWithProviders(<CurrencySearchForm />, {
      route: '/',
      path: '/',
    })

    expect(screen.getByRole('textbox', { name: /currency code/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /open dashboard/i })).toBeInTheDocument()
  })

  it('shows an error when the submitted code is invalid', async () => {
    const user = userEvent.setup()

    renderWithProviders(<CurrencySearchForm />, {
      route: '/',
      path: '/',
    })

    await user.type(screen.getByRole('textbox', { name: /currency code/i }), '12')
    await user.click(screen.getByRole('button', { name: /open dashboard/i }))

    expect(await screen.findByText(/use a 3-letter code/i)).toBeInTheDocument()
  })

  it('navigates to the currency detail route for a valid code', async () => {
    const user = userEvent.setup()

    renderWithProviders(<CurrencySearchForm />, {
      route: '/',
      path: '/',
      additionalRoutes: <Route path="/currencies/:code" element={<LocationProbe />} />,
    })

    await user.type(screen.getByRole('textbox', { name: /currency code/i }), 'eur')
    await user.click(screen.getByRole('button', { name: /open dashboard/i }))

    expect(await screen.findByText('/currencies/EUR')).toBeInTheDocument()
  })
})
