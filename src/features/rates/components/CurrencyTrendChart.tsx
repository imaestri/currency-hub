import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CurrencySnapshot } from '@/features/rates/types/rates'

type CurrencyTrendChartProps = {
  snapshot: CurrencySnapshot
}

export function CurrencyTrendChart({ snapshot }: CurrencyTrendChartProps) {
  return (
    <Card className="border-white/70 bg-white/80 shadow-soft backdrop-blur">
      <CardHeader>
        <CardTitle>Weekly trend</CardTitle>
      </CardHeader>
      <CardContent className="h-[320px] pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={snapshot.trend}>
            <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tickLine={false} />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              tickLine={false}
              axisLine={false}
              domain={['dataMin - 0.05', 'dataMax + 0.05']}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '16px',
                border: '1px solid hsl(var(--border))',
                boxShadow: '0 18px 40px -24px rgba(15, 23, 42, 0.28)',
              }}
            />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="hsl(var(--chart-1))"
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--chart-4))', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
