import React from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Button } from '@mui/material';

const UserProfile = () => {

  const handleLogout = () => {

  }

  return (
    <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
      <div className='flex flex-col justify-center items-center'>
        <AccountBoxIcon sx={{ fontSize: '5rem' }} />
        <h1 className='py-5 text-2xl font-semibold'>Vipusa Sriharan</h1>
        <p>Email : vipu@mail.com</p>
        <Button variant='contained' onClick={handleLogout} sx={{margin : '2rem 0rem'}}>Logout</Button>

      </div>
    </div>
  )
}

export default UserProfile
