export type CurrencyTrendPoint = {
  date: string
  rate: number
}

export type CurrencySnapshot = {
  code: string
  name: string
  region: string
  symbol: string
  trend: CurrencyTrendPoint[]
}
