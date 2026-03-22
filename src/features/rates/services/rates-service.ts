import type { CurrencySnapshot } from '@/features/rates/types/rates'

const snapshots: Record<string, CurrencySnapshot> = {
  USD: {
    code: 'USD',
    name: 'US Dollar',
    region: 'North America',
    symbol: '$',
    trend: [
      { date: 'Mon', rate: 5.04 },
      { date: 'Tue', rate: 5.08 },
      { date: 'Wed', rate: 5.06 },
      { date: 'Thu', rate: 5.12 },
      { date: 'Fri', rate: 5.1 },
    ],
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    region: 'Eurozone',
    symbol: '€',
    trend: [
      { date: 'Mon', rate: 5.47 },
      { date: 'Tue', rate: 5.44 },
      { date: 'Wed', rate: 5.5 },
      { date: 'Thu', rate: 5.48 },
      { date: 'Fri', rate: 5.53 },
    ],
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound',
    region: 'United Kingdom',
    symbol: '£',
    trend: [
      { date: 'Mon', rate: 6.41 },
      { date: 'Tue', rate: 6.38 },
      { date: 'Wed', rate: 6.45 },
      { date: 'Thu', rate: 6.49 },
      { date: 'Fri', rate: 6.47 },
    ],
  },
}

export async function getCurrencySnapshot(code: string) {
  await new Promise((resolve) => setTimeout(resolve, 150))
  return snapshots[code.toUpperCase()] ?? snapshots.USD
}
