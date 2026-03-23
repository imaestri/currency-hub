export function getStartDate(daysBack: number) {
  const date = new Date()
  date.setUTCDate(date.getUTCDate() - daysBack)

  return date.toISOString().slice(0, 10)
}

export function getWeekdayLabel(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}

export function getCurrencySymbol(code: string, fallbackSymbol?: string) {
  if (fallbackSymbol) {
    return fallbackSymbol
  }

  try {
    return (
      new Intl.NumberFormat('en', {
        style: 'currency',
        currency: code,
        currencyDisplay: 'narrowSymbol',
      })
        .formatToParts(1)
        .find((part) => part.type === 'currency')?.value ?? code
    )
  } catch {
    return code
  }
}
