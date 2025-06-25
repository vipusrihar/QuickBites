import { Grid } from '@mui/material'
import React from 'react'
import MenuTable from './MenuTable'
import OrderTable from './OrderTable'

const DashBoard = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <MenuTable />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <OrderTable />
        </Grid>
      </Grid>

    </div>
  )
}

export default DashBoard
