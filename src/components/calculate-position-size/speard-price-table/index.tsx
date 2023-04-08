import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export interface SpreadPriceTableType {
  stockPrice: string
  priceSpread: number
  totalStock: number
}

interface SpreadPriceTableProps {
  rows: SpreadPriceTableType[]
}

const SpreadPriceTable: React.FC<SpreadPriceTableProps> = ({ rows }) => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ระดับราคา</TableCell>
            <TableCell align="right">ช่วงราคา&nbsp;(บาท)</TableCell>
            <TableCell align="right">จำนวนหุ้นที่ต้องซื้อ&nbsp;(หุ้น)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.stockPrice}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.stockPrice}
              </TableCell>
              <TableCell align="right">{row.priceSpread}</TableCell>
              <TableCell align="right">{row.totalStock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SpreadPriceTable
