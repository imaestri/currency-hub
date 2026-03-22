import { Suspense } from 'react'
import { CurrenciesTable } from '@/features/rates/components/CurrenciesTable'
import { CurrenciesTableSkeleton } from '@/features/rates/components/CurrenciesTableSkeleton'

export function CurrenciesDetail() {
  return (
    <Suspense fallback={<CurrenciesTableSkeleton />}>
      <CurrenciesTable />
    </Suspense>
  )
}
