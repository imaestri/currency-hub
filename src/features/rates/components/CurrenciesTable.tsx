import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
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

export function CurrenciesTable() {
  const navigate = useNavigate()
  const currenciesQuery = useCurrenciesList()
  const currencies = currenciesQuery.data

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
                onClick={() => navigate(`/currencies/${currency.code}`)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    navigate(`/currencies/${currency.code}`)
                  }
                }}
              >
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
