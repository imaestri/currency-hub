import { create } from 'zustand'

type RatesStoreState = {
  selectedCurrencyCode: string
  setSelectedCurrencyCode: (code: string) => void
}

export const useRatesStore = create<RatesStoreState>((set) => ({
  selectedCurrencyCode: 'USD',
  setSelectedCurrencyCode: (code) => set({ selectedCurrencyCode: code.toUpperCase() }),
}))
