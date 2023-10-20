'use client'

import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'

function IconMenu() {
  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
        <MenuItem>
          <Link href="/export-harmonize-countries">ข้อมูลตลาดส่งออกรายพิกัดศุลกากร</Link>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{p: 2}}>
            <Link href="/">Noob Trader</Link>
          </Typography>
          <Typography variant="body1" component="div">
            <Link href="/export-harmonize-countries">ข้อมูลตลาดส่งออกรายพิกัดศุลกากร</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
