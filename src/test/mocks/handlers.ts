import { http, HttpResponse } from 'msw'

const FRANKFURTER_API_BASE_URL =
  'https://api.frankfurter.dev/v1'

const currencies = {
  BRL: 'Brazilian Real',
  EUR: 'Euro',
  GBP: 'British Pound Sterling',
  USD: 'United States Dollar',
}

function toBaseQuote(rateInBrl: number) {
  return Number((1 / rateInBrl).toFixed(6))
}

const trendByCode: Record<string, Array<[string, number]>> = {
  USD: [
    ['2026-03-16', 4.92],
    ['2026-03-17', 4.99],
    ['2026-03-18', 5.02],
    ['2026-03-19', 5.04],
    ['2026-03-20', 5.1],
  ],
  EUR: [
    ['2026-03-16', 5.41],
    ['2026-03-17', 5.44],
    ['2026-03-18', 5.48],
    ['2026-03-19', 5.5],
    ['2026-03-20', 5.53],
  ],
  GBP: [
    ['2026-03-16', 6.32],
    ['2026-03-17', 6.28],
    ['2026-03-18', 6.26],
    ['2026-03-19', 6.25],
    ['2026-03-20', 6.22],
  ],
}

export const handlers = [
  http.get(`${FRANKFURTER_API_BASE_URL}/currencies`, () => {
    return HttpResponse.json(currencies)
  }),
  http.get(`${FRANKFURTER_API_BASE_URL}/latest`, () => {
    return HttpResponse.json({
      base: 'BRL',
      date: '2026-03-20',
      rates: {
        USD: toBaseQuote(5.1),
        EUR: toBaseQuote(5.53),
        GBP: toBaseQuote(6.22),
      },
    })
  }),
  http.get(new RegExp(`${FRANKFURTER_API_BASE_URL}/\\d{4}-\\d{2}-\\d{2}\\.\\.`), ({ request }) => {
    const url = new URL(request.url)
    const code = url.searchParams.get('symbols')?.toUpperCase()

    if (!code || !trendByCode[code]) {
      return HttpResponse.json(
        {
          base: 'BRL',
          start_date: '2026-03-16',
          end_date: '2026-03-20',
          rates: {},
        },
        { status: 404 },
      )
    }

    return HttpResponse.json({
      base: 'BRL',
      start_date: '2026-03-16',
      end_date: '2026-03-20',
      rates: Object.fromEntries(
        trendByCode[code].map(([date, rateInBrl]) => [
          date,
          { [code]: toBaseQuote(rateInBrl) },
        ]),
      ),
    })
  }),
]
