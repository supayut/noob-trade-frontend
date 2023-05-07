'use client'

import logData from '../../public/json/log.json'

export default function Page() {
  return (
    <div>
      Stock: {logData.stock.lastModified}
      Warrants: {logData.warrants.lastModified}
    </div>
  )
}
