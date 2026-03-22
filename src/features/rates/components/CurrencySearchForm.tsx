import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCurrencySearchForm } from '@/features/rates/hooks/useCurrencySearchForm'
import type { CurrencySearchFormValues } from '@/features/rates/hooks/useCurrencySearchForm'
import { useRatesStore } from '@/features/rates/store/useRatesStore'

export function CurrencySearchForm() {
  const navigate = useNavigate()
  const setSelectedCurrencyCode = useRatesStore((state) => state.setSelectedCurrencyCode)
  const form = useCurrencySearchForm()
  
  const onSubmit = ({ code }: CurrencySearchFormValues) => {
    const normalizedCode = code.toUpperCase()

    setSelectedCurrencyCode(normalizedCode)
    navigate(`/currency/${normalizedCode}`)
  }

  return (
    <Card className="border-white/70 bg-white/80 shadow-soft backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl">Track a currency</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4 sm:flex-row" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex-1 space-y-2">
            <Input
              aria-label="Currency code"
              placeholder="Type USD, EUR, GBP..."
              autoComplete="off"
              className="h-12 bg-white"
              {...form.register('code', {
                setValueAs: (value: string) => value.trim().toUpperCase(),
                required: 'Use a 3-letter code.',
                minLength: {
                  value: 3,
                  message: 'Use a 3-letter code.',
                },
                maxLength: {
                  value: 3,
                  message: 'Use a 3-letter code.',
                },
                pattern: {
                  value: /^[A-Z]{3}$/,
                  message: 'Only letters are allowed.',
                },
              })}
            />
            {form.formState.errors.code ? (
              <p className="text-sm text-destructive">{form.formState.errors.code.message}</p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Search with a three-letter currency code.
              </p>
            )}
          </div>
          <Button type="submit" className="h-12 px-6">
            Open dashboard
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
