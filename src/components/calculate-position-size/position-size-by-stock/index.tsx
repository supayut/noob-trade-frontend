import { Box, Button, TextField } from '@mui/material'
import React from 'react'

interface InputArray {
  stockName: string
  stockPrice?: number
  risk?: number
  stockAmount: number
  cost: string
}

const PositionSizeByStock: React.FC = () => {

  const [inputArray, setInputArray] = React.useState<InputArray[]>([
    {
      stockName: '',
      stockPrice: undefined,
      risk: undefined,
      stockAmount: 0,
      cost: '0',
    }
  ])

  const handleStockNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    console.log(event.target.value)
    const { value, id } = event.target
    const newArray = [...inputArray]
    newArray[Number(id.split('-')[2])].stockName = value
    setInputArray(newArray)
    console.log(inputArray)
  }

  const getPriceSpread = (price: number) => {
    switch (true) {
      case price < 2:
        return 0.01
      case price >= 2 && price < 5:
        return 0.02
      case price >= 5 && price < 10:
        return 0.05
      case price >= 10 && price < 25:
        return 0.10
      case price >= 25 && price < 100:
        return 0.25
      case price >= 100 && price < 200:
        return 0.50
      case price >= 200 && price < 400:
        return 1
      case price >= 400:
        return 2
      default:
        return 0
    }
  }

  const calculateStockAmount = (risk: number, price: number): number => {
    return Math.round(risk/getPriceSpread(price))
  }

  const calculateCost = (price: number, amount: number): string => {
    return (price*amount).toFixed(2)
  }

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const { value, id } = event.target
    const index = Number(id.split('-')[1])
    const newArray = [...inputArray]
    newArray[index].stockPrice = Number(value)
    newArray[index].stockAmount = calculateStockAmount(inputArray[index].risk || 0, Number(value))
    newArray[index].cost = calculateCost(Number(value), inputArray[index].stockAmount)
    setInputArray(newArray)
  }

  const handleRiskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const { value, id } = event.target
    const index = Number(id.split('-')[1])
    const newArray = [...inputArray]
    newArray[index].risk = Number(value)
    newArray[index].stockAmount = calculateStockAmount(Number(value), inputArray[index].stockPrice || 0)
    newArray[index].cost = calculateCost(inputArray[index].stockPrice || 0, inputArray[index].stockAmount)
    setInputArray(newArray)
  }

  const renderNewRow = (stock: InputArray, index: number) => {
    return (
      <Box sx={{ backgroundColor: index%2===0 ? 'aliceblue': 'none'}}>
        <TextField
          id={`stock-name-${index}`}
          label="ชื่อหุ้น"
          helperText="กรุณากรอกชื่อหุ้น"
          value={stock.stockName}
          onChange={handleStockNameChange}
        >
        </TextField>
        <TextField
          id={`price-${index}`}
          label="ราคาหุ้น"
          helperText="กรุณากรอกราคาหุ้น ณ ปัจจุบัน"
          value={stock.stockPrice || ''}
          onChange={handlePriceChange}
          type='number'
        >
        </TextField>
        <TextField
          id={`risk-${index}`}
          label="กำไรที่คาดหวังต่อ 1ช่อง"
          helperText="กรุณากรอกกำไรที่คาดหวังต่อ 1ช่อง"
          value={stock.risk || ''}
          onChange={handleRiskChange}
          type='number'
        >
        </TextField>
        <TextField
          id={`stock-amount-${index}`}
          helperText="จำนวนหุ้นที่คุณต้องซื้อ"
          InputProps={{
            readOnly: true,
          }}
          value={stock.stockAmount}
        >
        </TextField>
        <TextField
          id={`cost-${index}`}
          helperText="จำนวนเงินที่คุณต้องใช้ซื้อหุ้น"
          InputProps={{
            readOnly: true,
          }}
          value={stock.cost}
        >
        </TextField>
      </Box>
    )
  }

  const handleClickAddStock = () => {
    setInputArray([...inputArray, {
      stockName: '',
      stockPrice: undefined,
      risk: undefined,
      stockAmount: 0,
      cost: '0',
    }])
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '30ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <h4>จำนวนหุ้น และ จำนวนเงิน ที่ใช้ซื้อเพื่อให้ได้ผลตอบแทน X บาท/ช่อง รายตัว</h4>
      {
        inputArray.map((stock, index) => {
          console.log('rendersss')
          return renderNewRow(stock, index)
        })
      }
      <Button
        sx={{ m: 2}}
        id="add-stock-button"
        variant="contained"
        onClick={handleClickAddStock}
      >
        เพิ่มหุ้น
      </Button>
    </Box>
  )
}

export default PositionSizeByStock
