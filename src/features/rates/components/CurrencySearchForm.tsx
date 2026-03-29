import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCurrencySearchForm } from '@/features/rates/hooks/useCurrencySearchForm'
import type { CurrencySearchFormValues } from '@/features/rates/hooks/useCurrencySearchForm'

export function CurrencySearchForm() {
  const navigate = useNavigate()
  const form = useCurrencySearchForm()
  
  const onSubmit = ({ code }: CurrencySearchFormValues) => {
    const normalizedCode = code.toUpperCase()

    navigate(`/currencies/${normalizedCode}`)
  }

  return (
    <Card className="border-white/70 bg-white/80 shadow-soft backdrop-blur">
      <CardHeader>
        <CardTitle className="text-xl">Find a currency by code</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4 sm:flex-row" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex-1 space-y-2">
            <Input
              aria-label="Currency code"
              placeholder="Try USD, EUR, GBP..."
              autoComplete="off"
              className="h-12 bg-white"
              {...form.register('code', {
                setValueAs: (value: string) => value.trim().toUpperCase(),
                required: 'Enter a 3-letter currency code, like USD.',
                minLength: {
                  value: 3,
                  message: 'Enter a 3-letter currency code, like USD.',
                },
                maxLength: {
                  value: 3,
                  message: 'Enter a 3-letter currency code, like USD.',
                },
                pattern: {
                  value: /^[A-Z]{3}$/,
                  message: 'Use letters only, without numbers or symbols.',
                },
              })}
            />
            {form.formState.errors.code ? (
              <p className="text-sm text-destructive">{form.formState.errors.code.message}</p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Use the 3-letter code of the currency you want to open.
              </p>
            )}
          </div>
          <Button type="submit" className="h-12 px-6">
            Open details
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
