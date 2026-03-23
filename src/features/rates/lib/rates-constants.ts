export const LISTED_CURRENCY_CODES = ['USD', 'EUR', 'GBP'] as const

export const currencyMetadata: Record<string, { region: string; symbol?: string }> = {
  USD: { region: 'North America', symbol: '$' },
  EUR: { region: 'Eurozone', symbol: '€' },
  GBP: { region: 'United Kingdom', symbol: '£' },
  BRL: { region: 'Brazil', symbol: 'R$' },
}
