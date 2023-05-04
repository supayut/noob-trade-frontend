import { Box, Container, FormControl, FormHelperText, InputAdornment, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'
import SpreadPriceTable, { SpreadPriceTableType } from './speard-price-table'
import PositionSizeByStock from './position-size-by-stock';

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

  // const calculateStockAmount = (price: number) => {
  //   switch (true) {
  //     case price < 2:
  //       setMoney((price*rows[0].totalStock).toFixed(2))
  //       setStockAmount(rows[0].totalStock)
  //       break
  //     case price >= 2 && price < 5:
  //       console.log(rows[1].totalStock)
  //       setMoney((price*rows[1].totalStock).toFixed(2))
  //       setStockAmount(rows[1].totalStock)
  //       break
  //     case price >= 5 && price < 10:
  //       setMoney((price*rows[2].totalStock).toFixed(2))
  //       setStockAmount(rows[2].totalStock)
  //       break
  //     case price >= 10 && price < 25:
  //       setMoney((price*rows[3].totalStock).toFixed(2))
  //       setStockAmount(rows[3].totalStock)
  //       break
  //     case price >= 25 && price < 100:
  //       setMoney((price*rows[4].totalStock).toFixed(2))
  //       setStockAmount(rows[4].totalStock)
  //       break
  //     case price >= 100 && price < 200:
  //       setMoney((price*rows[5].totalStock).toFixed(2))
  //       setStockAmount(rows[5].totalStock)
  //       break
  //     case price >= 200 && price < 400:
  //       setMoney((price*rows[6].totalStock).toFixed(2))
  //       setStockAmount(rows[6].totalStock)
  //       break
  //     case price >= 400:
  //       setMoney((price*rows[7].totalStock).toFixed(2))
  //       setStockAmount(rows[7].totalStock)
  //       break
  //     default:
  //       setMoney('0')
  //       setStockAmount(0)
  //       break
  //   }
  // }

  const handlePositionSizeKeyup = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const riskSize = Number(event.currentTarget.value)
    const newRows = rows.map((row) => {
      const totalStock = Math.round(riskSize / row.priceSpread)
      return createData(row.stockPrice, row.priceSpread, totalStock)
    })
    setRows(newRows)
  }

  // const handlePriceKeyup = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   const price = Number(event.currentTarget.value)
  //   calculateStockAmount(price)
  // }

  return (
    <Container maxWidth="lg">
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
        {/* <FormControl>
          <OutlinedInput
            sx={{
              '& input': {
                textAlign: 'right',
              },
            }}
            id="price"
            type="number"
            endAdornment={<InputAdornment position="end">บาท</InputAdornment>}
            onKeyUp={handlePriceKeyup}
          />
          <FormHelperText id="outlined-weight-helper-text">ราคาปัจจุบัน</FormHelperText>
        </FormControl> */}
        {/* <FormControl>
          <OutlinedInput
            sx={{
              '& input': {
                textAlign: 'right',
              },
              '& fieldset': {
                borderColor: 'green !important',
                borderWidth: 2,
              },
            }}
            id="stock-amount"
            type="number"
            endAdornment={<InputAdornment position="end">หุ้น</InputAdornment>}
            readOnly
            value={stockAmount || 0}
          />
          <FormHelperText id="outlined-weight-helper-text">จำนวนหุ้นที่ต้องซื้อ</FormHelperText>
        </FormControl>
        <FormControl>
          <OutlinedInput
            sx={{
              '& input': {
                textAlign: 'right',
              },
              '& fieldset': {
                borderColor: 'green !important',
                borderWidth: 2,
              },
            }}
            id="money"
            type="number"
            endAdornment={<InputAdornment position="end">บาท</InputAdornment>}
            readOnly
            value={money || ''}
          />
          <FormHelperText id="outlined-weight-helper-text">จำนวนเงินที่ใช้ซื้อ</FormHelperText>
        </FormControl> */}
      </Box>
      <SpreadPriceTable rows={rows} />
      <PositionSizeByStock/>
    </Container>
  )
}

export default CalculatePositionSize
