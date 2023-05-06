import CalculatePositionSize from '@/components/calculate-position-size'
import PositionSizeByStock from '@/components/position-size-by-stock'

export default function Home() {
  return (
    <>
      <CalculatePositionSize />
      <PositionSizeByStock />
    </>
  )
}
