import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'


import OrderTable from './OrderTable'

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "All", value: "ALL" }
]

const Orders = () => {
  const [filterValue, setFilterValue] = useState();

  const handleFilter = (e, value) => {
    setFilterValue(value)
  }
  return (
    <div>
      <Card className='p-5'>
        <Typography sx={{ paddingBottom: '1rem' }} variant='h5'>
          Order Status
        </Typography>

        <FormControl>
          <RadioGroup onChange={handleFilter} row name='category' value={filterValue || null}>
            {orderStatus.map((item) =>
              <FormControlLabel key={item.label} value={item.value} control={<Radio />} label={item.label} sx={{ color: 'grey' }} />
            )}

          </RadioGroup>
        </FormControl>
      </Card>
      <OrderTable />

    </div>
  )
}

export default Orders
