import type { CurrencyListItem, CurrencySnapshot } from '@/features/rates/types/rates'
import { currencyMetadata, LISTED_CURRENCY_CODES } from '@/features/rates/lib/rates-constants'
import {
  getCurrencySymbol,
  getStartDate,
  getWeekdayLabel,
} from '@/features/rates/lib/rates-formatters'

const FRANKFURTER_API_BASE_URL =
  import.meta.env.VITE_FRANKFURTER_API_BASE_URL ?? 'https://api.frankfurter.dev/v1'

let currenciesDictionaryPromise: Promise<Record<string, string>> | null = null

type FrankfurterLatestResponse = {
  base: string
  date: string
  rates: Record<string, number>
}

type FrankfurterTimeSeriesResponse = {
  base: string
  start_date: string
  end_date: string
  rates: Record<string, Record<string, number>>
}

async function fetchFrankfurter<T>(path: string) {
  const response = await fetch(`${FRANKFURTER_API_BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Frankfurter request failed with status ${response.status}.`)
  }

  return (await response.json()) as T
}

async function getCurrenciesDictionary() {
  if (!currenciesDictionaryPromise) {
    currenciesDictionaryPromise = fetchFrankfurter<Record<string, string>>('/currencies')
  }

  return currenciesDictionaryPromise
}

async function getCurrencyTrend(code: string) {
  if (code === 'BRL') {
    return Array.from({ length: 5 }).map((_, index) => ({
      date: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][index],
      rate: 1,
    }))
  }

  const startDate = getStartDate(14)
  const timeSeries = await fetchFrankfurter<FrankfurterTimeSeriesResponse>(
    `/${startDate}..?base=BRL&symbols=${code}`,
  )

  return Object.entries(timeSeries.rates)
    .slice(-5)
    .map(([date, rateMap]) => {
      const quote = rateMap[code]

      if (!quote) {
        throw new Error(`Frankfurter did not return a BRL quote for ${code}.`)
      }

      return {
        date: getWeekdayLabel(date),
        rate: Number((1 / quote).toFixed(4)),
      }
    })
}

export async function getCurrencySnapshot(code: string) {
  const normalizedCode = code.toUpperCase()
  const currenciesDictionary = await getCurrenciesDictionary()
  const currencyName = currenciesDictionary[normalizedCode]

  if (!currencyName) {
    throw new Error(`Currency ${normalizedCode} is not supported by Frankfurter.`)
  }

  const trend = await getCurrencyTrend(normalizedCode)

  return {
    code: normalizedCode,
    name: currencyName,
    region: currencyMetadata[normalizedCode]?.region ?? 'Global markets',
    symbol: getCurrencySymbol(normalizedCode, currencyMetadata[normalizedCode]?.symbol),
    trend,
  } satisfies CurrencySnapshot
}

export async function getCurrenciesList(): Promise<CurrencyListItem[]> {
  const currenciesDictionary = await getCurrenciesDictionary()
  const latestQuotes = await fetchFrankfurter<FrankfurterLatestResponse>(
    `/latest?base=BRL&symbols=${LISTED_CURRENCY_CODES.join(',')}`,
  )

  return LISTED_CURRENCY_CODES.map((code) => ({
    code,
    name: currenciesDictionary[code] ?? code,
    region: currencyMetadata[code]?.region ?? 'Global markets',
    symbol: getCurrencySymbol(code, currencyMetadata[code]?.symbol),
    latestRate: Number((1 / latestQuotes.rates[code]).toFixed(4)),
  }))
}
