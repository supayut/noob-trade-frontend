
import logData from '../../utils/json/log.json'
export default function StockInfo() {
  return (
    <div>
      Stock: {logData.stock.lastModified}
      Warrants: {logData.warrants.lastModified}
    </div>
  )
}
