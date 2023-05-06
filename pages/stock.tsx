import * as React from 'react'
import logData from '../utils/json/log.json'

export default function Stock() {
  return
  (
    <div>
      Stock: {logData.stock.lastModified}
      Warrants: {logData.warrants.lastModified}
    </div>
  )
}
