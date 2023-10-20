'use client';
import { Box, FormControl, FormHelperText, InputAdornment, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'
import SpreadPriceTable, { SpreadPriceTableType } from './speard-price-table'

const CalculatePositionSize: React.FC = () => {

  function createData(
    stockPrice: string,
    priceSpread: number,
    totalStock: number,
  ): SpreadPriceTableType {
    return { stockPrice, priceSpread, totalStock };
  }

  const [rows, setRows] = useState([
    createData('ต่ำกว่า 2 บาท', 0.01, 0),
    createData('ตั้งแต่ 2 บาท แต่ต่ำกว่า 5 บาท', 0.02, 0),
    createData('ตั้งแต่ 5 บาท แต่ต่ำกว่า 10 บาท', 0.05, 0),
    createData('ตั้งแต่ 10 บาท แต่ต่ำกว่า 25 บาท', 0.10, 0),
    createData('ตั้งแต่ 25 บาท แต่ต่ำกว่า 100 บาท', 0.25, 0),
    createData('ตั้งแต่ 100 บาท แต่ต่ำกว่า 200 บาท', 0.50, 0),
    createData('ตั้งแต่ 200 บาท แต่ต่ำกว่า 400 บาท', 1.00, 0),
    createData('ตั้งแต่ 400 บาทขึ้นไป', 2.00, 0),
  ])

  const handlePositionSizeKeyup = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const riskSize = Number(event.currentTarget.value)
    const newRows = rows.map((row) => {
      const totalStock = Math.round(riskSize / row.priceSpread)
      return createData(row.stockPrice, row.priceSpread, totalStock)
    })
    setRows(newRows)
  }

  return (
    <>
      <h4>แสดงจำนวนหุ้นที่ต้องซื้อเพื่อให้ได้ผลตอบแทนตามจำนวนที่กำหนดต่อ 1ช่อง ในแต่ละช่วงราคา (เหมาะสำหรับ DayTrade)</h4>
      <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 2, width: '30ch' },
          }}
          noValidate
          autoComplete="off"
        >
        <FormControl>
          <OutlinedInput
            sx={{
              '& input': {
                textAlign: 'right',
              },
            }}
            id="position-size"
            type="number"
            endAdornment={<InputAdornment position="end">บาท</InputAdornment>}
            onKeyUp={handlePositionSizeKeyup}
          />
          <FormHelperText id="outlined-weight-helper-text">กำไรที่อยากได้ (บาท/ช่อง)</FormHelperText>
        </FormControl>
      </Box>
      <SpreadPriceTable rows={rows} />
    </>
  )
}

export default CalculatePositionSize
