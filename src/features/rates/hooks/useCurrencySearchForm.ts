import { useForm } from 'react-hook-form'

export type CurrencySearchFormValues = {
  code: string
}

export function useCurrencySearchForm() {
  return useForm<CurrencySearchFormValues>({
    mode: 'onSubmit',
  })
}
