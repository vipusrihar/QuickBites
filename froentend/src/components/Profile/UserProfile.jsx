import React from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {logout} from '../../state/authentication/Action'

const UserProfile = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);

  console.log("auth : " ,auth)
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  }

  return (
    <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
      <div className='flex flex-col justify-center items-center'>
        <AccountBoxIcon sx={{ fontSize: '5rem' }} />
        <h1 className='py-5 text-2xl font-semibold'> {auth.user.firstName}  {auth.user.LastName} Sriharan</h1>
        <p>Email :  {auth.user.email}</p>
        <Button variant='contained' onClick={handleLogout} sx={{ margin: '2rem 0rem' }}>Logout</Button>

      </div>
    </div>
  )
}

export default UserProfile
