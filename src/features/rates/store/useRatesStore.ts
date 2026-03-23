import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type RatesStoreState = {
  favoriteCodes: string[]
  toggleFavorite: (code: string) => void
}

export const useRatesStore = create<RatesStoreState>()(
  persist(
    (set) => ({
      favoriteCodes: [],
      toggleFavorite: (code) =>
        set((state) => {
          const normalizedCode = code.toUpperCase()
          const isFavorite = state.favoriteCodes.includes(normalizedCode)

          return {
            favoriteCodes: isFavorite
              ? state.favoriteCodes.filter((favoriteCode) => favoriteCode !== normalizedCode)
              : [...state.favoriteCodes, normalizedCode],
          }
        }),
    }),
    {
      name: 'rates-store',
      partialize: (state) => ({
        favoriteCodes: state.favoriteCodes,
      }),
    },
  ),
)
