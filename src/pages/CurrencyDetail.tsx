import { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { CurrencyDetailContent } from '@/features/rates/components/CurrencyDetailContent'
import { CurrencyDetailSkeleton } from '@/features/rates/components/CurrencyDetailSkeleton'

export function CurrencyDetail() {
  const { code = 'USD' } = useParams()

  return (
    <Suspense fallback={<CurrencyDetailSkeleton />}>
      <CurrencyDetailContent code={code} />
    </Suspense>
  )
}
