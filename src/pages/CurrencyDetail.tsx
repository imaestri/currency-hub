import { useParams } from 'react-router-dom'
import { CurrencyDetailContent } from '@/features/rates/components/CurrencyDetailContent'

export function CurrencyDetail() {
  const { code = 'USD' } = useParams()

  return <CurrencyDetailContent code={code} />
}
