import { Card, FormControl, FormControlLabel, RadioGroup, Typography } from '@mui/material'
import React from 'react'
import MenuTable from './MenuTable'

const Menu = () => {
  return (
        <div>
      {/* <Card className='p-5'>
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
      </Card> */}
      <MenuTable/>


    </div>
  )
}

export default Menu
