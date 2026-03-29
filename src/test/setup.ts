import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { useRatesStore } from '@/features/rates/store/useRatesStore'
import { server } from '@/test/server'

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  })
  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    value: ResizeObserverMock,
  })
})

afterEach(() => {
  server.resetHandlers()
  cleanup()
  localStorage.clear()
  useRatesStore.setState(useRatesStore.getInitialState())
  document.title = 'CurrencyHub'
})

afterAll(() => {
  server.close()
})
