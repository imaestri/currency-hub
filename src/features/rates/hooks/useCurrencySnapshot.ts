import { useSuspenseQuery } from '@tanstack/react-query'
import { getCurrencySnapshot } from '@/features/rates/services/rates-service'

export function useCurrencySnapshot(code: string) {
  return useSuspenseQuery({
    queryKey: ['currency-snapshot', code],
    queryFn: () => getCurrencySnapshot(code),
  })
}
