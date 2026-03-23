import { ArrowRight, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useCurrenciesList } from '@/features/rates/hooks/useCurrenciesList'
import { useRatesStore } from '@/features/rates/store/useRatesStore'

export function CurrenciesTable() {
  const navigate = useNavigate()
  const currenciesQuery = useCurrenciesList()
  const currencies = currenciesQuery.data
  const favoriteCodes = useRatesStore((state) => state.favoriteCodes)
  const toggleFavorite = useRatesStore((state) => state.toggleFavorite)
  
  const openCurrencyDetails = (code: string) => {
    navigate(`/currencies/${code}`)
  }

  return (
    <Card className="border-white/70 bg-white/80 shadow-soft backdrop-blur">
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl">Currencies directory</CardTitle>
        <p className="text-sm text-muted-foreground">
          Browse all available mock currencies and open a detail view for each one.
        </p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Fav</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead className="text-right">Latest BRL</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currencies.map((currency) => (
              <TableRow
                key={currency.code}
                className="cursor-pointer"
                tabIndex={0}
                onClick={() => openCurrencyDetails(currency.code)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    openCurrencyDetails(currency.code)
                  }
                }}
              >
                <TableCell>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={
                      favoriteCodes.includes(currency.code)
                        ? `Remove ${currency.code} from favorites`
                        : `Add ${currency.code} to favorites`
                    }
                    onClick={(event) => {
                      event.stopPropagation()
                      toggleFavorite(currency.code)
                    }}
                  >
                    <Star
                      className={
                        favoriteCodes.includes(currency.code)
                          ? 'size-4 fill-accent text-accent'
                          : 'size-4 text-muted-foreground'
                      }
                    />
                  </Button>
                </TableCell>
                <TableCell className="font-semibold">{currency.code}</TableCell>
                <TableCell>{currency.name}</TableCell>
                <TableCell>{currency.region}</TableCell>
                <TableCell>{currency.symbol}</TableCell>
                <TableCell className="text-right font-medium">
                  {currency.latestRate.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Details
                    <ArrowRight className="size-4" />
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
