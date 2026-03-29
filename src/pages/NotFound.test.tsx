import { screen } from '@testing-library/react'
import { NotFound } from '@/pages/NotFound'
import { renderWithProviders } from '@/test/render-with-providers'

describe('NotFound', () => {
  it('renders the expected 404 message and return home action', () => {
    renderWithProviders(<NotFound />, {
      route: '/missing',
      path: '*',
    })

    expect(screen.getByRole('heading', { name: /we could not find this page/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /go to dashboard/i })).toHaveAttribute('href', '/')
  })
})
