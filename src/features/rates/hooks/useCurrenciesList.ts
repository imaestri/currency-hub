import { useSuspenseQuery } from '@tanstack/react-query'
import { getCurrenciesList } from '@/features/rates/services/rates-service'

export function useCurrenciesList() {
  return useSuspenseQuery({
    queryKey: ['currencies-list'],
    queryFn: getCurrenciesList,
  })
}
